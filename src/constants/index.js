
import * as colors from '@material-ui/core/colors';
import faker from 'faker'

export const MATERIAL_COLORS = faker.helpers.shuffle(Object
  .keys(colors)
  .reduce((all, name) => {
    // eslint-disable-next-line no-unused-vars
    const [c50, c100, c200, c300, c400, ...rest] = Object.values(colors[name])
    return [...all, ...rest]
  }, []))


const {
  yellow,
  red,
  deepOrange,
  lightGreen,
  lightBlue,
  grey
} = colors

export const Labels = {}

export const TEST_CASE = {
  name: 'Test case name',
  code: `
  /**
   * Puedes colocar el cuerpo del método de tu caso de prueba.
   * Un caso de prueba es un método que será ejecutado para probar la funcionalidad de una pieza de software.
   * 
   * Por ejemplo, si el estudiante tiene una clase llamada calculadora; un caso de prueba evaluaría el método
   * 'evaluar' de la clase calculadora. 
   * 
   * Para esto puedes usar los decoradores que JUnit provee.
   * 
   * El siguiente código por ejemplo, usará el método estático assertEquals. Éste método es provisto por
   * JUnit. El primer parámetro es el valor esperado y el segundo parámetro el obtenido
   */

   assertEquals(2,studentCalculator.sumar(1,1));

   /**
    * 
    * Si el método sumar, no retorna dos, entonces fallará el test.
    * sin embargo puedes añadir mas asserts para validar por ejemplo que sume negativos
    * 
    */ 

    assertEquals(-2,studentCalculator.sumar(-1,-1))

`,
  grade: 0,
  objective: 'Description not provided',
  successMessage: 'Successfull message not provided',
  successMessageLink: 'Successfull link not provided',
  failureMessage: 'Failure link not provided',
  failureMessageLink: 'Failure link not provided',
  topic: []
}

export const Colors = {
  white: grey[50],
  black: grey[900]
}

export const SimbolicColors = {
  // skill > 95% 
  excelent: {
    color: lightBlue.A700,
    text: Colors.white
  },
  // skill > 90% 
  veryGood: {
    color: lightGreen.A700,
    text: Colors.black
  },
  // skill > 80% 
  good: {
    color: yellow.A700,
    text: Colors.black
  },
  // skill > 60% 
  better: {
    color: yellow.A100,
    text: Colors.black
  },
  // skill > 50% 
  regular: {
    color: grey[100],
    text: Colors.black
  },
  // skill > 30% 
  bad: {
    color: deepOrange.A400,
    text: Colors.white
  },
  // skill > 15% 
  veryBad: {
    color: deepOrange.A700,
    text: Colors.white
  },
  // skill > 0 %
  insuficent: {
    color: red.A700,
    text: Colors.white
  }
}

export const SkillMapColors = Array(100)
  .fill(0)
  .map((v, skill) => {
    if (skill >= 95) return SimbolicColors.excelent
    else if (skill >= 90) return SimbolicColors.veryGood
    else if (skill >= 80) return SimbolicColors.good
    else if (skill >= 60) return SimbolicColors.better
    else if (skill >= 50) return SimbolicColors.regular
    else if (skill >= 35) return SimbolicColors.bad
    else if (skill >= 15) return SimbolicColors.veryBad
    else return SimbolicColors.insuficent
  })

