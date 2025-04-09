import { PrismaClient, Role } from '@prisma/client'


const prisma = new PrismaClient()


async function getAllUsers() {
    const result = await prisma.appUser.findMany();
    return result;
}

//READ
async function findUser(id: number) {
    const book = await prisma.appUser.findUnique({
        where: { userid: id }
    })
    return book;
}

//CREATE
async function createUser(email: string, password: string, firstname: string, lastname: string, role :Role) {
    return await prisma.appUser.create({
        data: { email, password, firstname, lastname, role: role || "POWER"  }
    })
}

//DELETE
async function deleteUser(id: number) {
    await prisma.appUser.delete({
        where: { userid: id }
    });
}

//UPDATE
async function updateUser(id: number, newEmail: string) {
    return await prisma.appUser.update({
        where: { userid: id },
        data: { email: newEmail}
    })
}

const quickStart = async () => {
    // const result = await createBook("Fire and Ice", "Brandon Sanderson");
    // const result = await getAllBooks();
    // const result = await findBook(2);
    // const result = await deleteBook(1);
    // const result = await updateBook(2, "Fire and Ice", "Brandon Sanderson");
    // console.log(result);
}


quickStart();