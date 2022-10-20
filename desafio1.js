class Usuario{
    constructor(nombre,apellido){
        this.nombre=nombre,
        this.apellido=apellido,
        this.libros=[],
        this.mascotas=[]
    }
    getFullName=()=>{
        return `${this.nombre} ${this.apellido}`
    }
    addMascota=(nameMascota)=>{
        this.mascotas.push(nameMascota)
    }
    countMascotas=()=>{
        return this.mascotas.length
    }
    addBook=(name,author)=>{
        this.libros.push({
            nombre:name,
            autor:author
        })
    }
    getBookNames=()=>{
        return this.libros.map(libro=>libro.nombre)
    }
}
const usuario1=new Usuario("Denis","Mamani")
usuario1.addMascota("perro")
usuario1.addMascota("conejo")
usuario1.addBook ("El extraño caso del doctor Jekyll y el señor Hyde", "Robert Louis Stevenson")
usuario1.addBook("Fantasy Of Grimgar","Ao Jyumonji")
console.log(`el nombre completo del usuario es ${usuario1.getFullName()}
tiene ${usuario1.countMascotas()} mascotas.
Los libros del usuario son ${usuario1.getBookNames()}
`)