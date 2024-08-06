import LightningBolt from './src/lightningbolt.js'

const state = {}

const hashNumber = num => 
{
  let hash = num ^ (num >>> 16)
  hash = (hash * 0x45d9f3b) ^ (hash >>> 16)
  hash = (hash * 0x45d9f3b) ^ (hash >>> 16)
  return hash >>> 0
}

const rnd = seed =>
{
  seed = Array.isArray(seed)
    ? seed.concat([...Array(4-seed.length)].map((_,i) => (seed.at(-1) ?? 0) + (seed.at(-2) ?? 0) + i + 1))
    : [seed, seed + 1, seed + 2, seed + 3]

  let [a, b, c, d, t] = [...seed.map(hashNumber), 0]

  return _ => (
    a |= 0, b |= 0, c |= 0, d |= 0,
    t = (a + b | 0) + d | 0,
    d = d + 1 | 0,
    a = b ^ b >>> 9,
    b = c + (c << 3) | 0,
    c = (c << 21 | c >>> 11),
    c = c + t | 0,
    (t >>> 0) / 4294967296
  )
}

const lightningTimeout = (canvas, seed, first = false, lightning = null) => 
{
  let delay = (Math.random() * (first ? 700 : 0) >> 0) + (first ? 300 : 100)
  seed = seed ?? [...Array(2)].map(_ => hashNumber((state.rand() * 1000) >> 0 + 1))

  state.timeout = setTimeout(_ => {
    if (!lightning) {
      lightning = new LightningBolt(canvas, rnd(seed), {margin: 100})
      lightning.generate()
    }
    else {
      lightning.draw()
    }
    let repeat = (state.rand() * 6 - 4) >> 0

    state.timeout = setTimeout(_=> {
      lightning.clear()
      if (first && repeat > 0 && state.animationEnabled) {
        lightningTimeout(canvas, seed, false, lightning)
      }
    }, repeat > 0 ? 50 : 100)
    
    if ((!first || (first && repeat <= 0)) && state.animationEnabled) {
      randomTimeout(canvas)
    }
  }, delay)
}

const randomTimeout = canvas =>
{
  lightningTimeout(canvas, null, true)
}

window.addEventListener('load', _ => {
  document.querySelector("#seed").addEventListener("input", e => {
    let seed = e.target.value
    let seedInput = document.querySelector("#seedValue")

    seedInput.value = seed
    seedInput.dispatchEvent(new Event("change"))
  })

  document.querySelector("#seedValue").addEventListener("change", e => {
    let seed = e.target.value
    let lightning = new LightningBolt(document.querySelector("#myCanvas"), rnd(+e.target.value), {margin: 100})

    lightning.generate()
    document.querySelector("#seed").value = seed
  })

  document.querySelector("#toggle").addEventListener("click", e => {
    let button = e.target
    if (state.animationEnabled) {
      state.animationEnabled = false
      button.innerText = "Start animation"
      clearTimeout(state.timeout)
      document.querySelector("#seed").dispatchEvent(new Event("input"))
    } else {
      state.animationEnabled = true
      button.innerText = "Stop animation"
      state.rand = rnd(document.querySelector("#seedValue").value)
      state.timeout = randomTimeout(document.querySelector("#myCanvas"))
    }
  })

  document.querySelector("#seed").dispatchEvent(new Event("input"))
})
