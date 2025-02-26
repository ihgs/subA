
const parseMin = (hhmm?: string): number => {
    if (!hhmm) {
      return 0
    }
    const match = hhmm.match(/(\d+):(\d+)/)
    if (match) {
      const hour = match[1]
      const min = match[2]
      return parseInt(hour) * 60 + parseInt(min)
    }
    return 0
  }

  const myParseInt = (value: string | null, defaultValue: number) => {
    if (value == null) {
      return defaultValue
    }
    return parseInt(value) || defaultValue
  }
  
  const roundQuartor = (min: number) => {
    if (min < 8) {
      return [0, 0]
    } else if (min < 23) {
      return [0, 15]
    } else if (min < 38) {
      return [0, 30]
    } else if (min < 53) {
      return [0, 45]
    } else {
      return [1, 0]
    }
  }
  export {
    parseMin,
    myParseInt,
    roundQuartor,
  }