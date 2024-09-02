import bcrypt from 'bcrypt'

export const generateHashedPassword = (password: string) =>{
 return bcrypt.hashSync(password, 10)

}

export const comparePassword = (plainPassword:string, hashedPassword: string):boolean =>{

    return bcrypt.compareSync(plainPassword , hashedPassword )
}