import { basePose } from './pose'

export function createPoseStore() {
  const store = {
    state: { ...basePose, snap: true },
    apply(id, next) {
      const s = store.state
      if (s.owner !== id) {
        s.snap = true
        s.owner = id
      }
      Object.assign(s, next)
    },
  }
  return store
}