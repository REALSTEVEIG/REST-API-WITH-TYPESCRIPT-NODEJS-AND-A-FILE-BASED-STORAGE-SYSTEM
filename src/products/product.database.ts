import { Product, Products, UnitProduct } from "./product.interface";
import {v4 as random} from "uuid"

let products : Products = {
    "a" : {
        id : "a",
        name : "Shoes",
        price : 100,
        quantity : 400,
        image : "image1/url"
    },
    "b" : {
        id : "b",
        name : "Bags",
        price : 50,
        quantity : 700,
        image : "image2/url"
    },
    "c" : {
        id : "c",
        name : "Shirts",
        price : 70,
        quantity : 420,
        image : "image3/url"
    },
    "d" : {
        id : "d",
        name : "Shorts",
        price : 82,
        quantity : 900,
        image : "image4/url"
    },
    "e" : {
        id : "e",
        name : "Gowns",
        price : 111,
        quantity : 4000,
        image : "image4/url"
    }
}

export const findAll = async () : Promise<UnitProduct[]> => Object.values(products)

export const findOne = async (id : string) : Promise<UnitProduct> => products[id]

export const create = async (productInfo : Product) : Promise<null | UnitProduct> => {

    let id = random()

    let product = await findOne(id)

    while (product) {
        id = random ()
        await findOne(id)
    }

    products[id] = {
        id : id,
        ...productInfo
    }

    return products[id]
}

export const update = async (id : string, updateValues : Product) : Promise<UnitProduct | null> => {

    const product = await findOne(id) 

    if (!product) {
        return null
    }

    products[id] = {
        id,
        ...updateValues
    }

    return products[id]
}

export const remove = async (id : string) : Promise<null | void> => {

    const product = await findOne(id)

    if (!product) {
        return null
    }

    delete products[id]

}