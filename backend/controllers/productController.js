import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.params
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for updating product
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller } = req.body

        const product = await productModel.findById(id)
        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }

        // Update product data first
        product.name = name
        product.description = description
        product.category = category
        product.price = Number(price)
        product.subCategory = subCategory
        product.bestseller = bestseller === "true" ? true : false
        product.sizes = JSON.parse(sizes)

        // Handle image uploads only if files exist and are valid
        if (req.files) {
            console.log('Files object:', req.files);
            
            // Check each image field separately with thorough validation
            const image1 = (req.files.image1 && req.files.image1[0] && req.files.image1[0].path) ? req.files.image1[0] : null
            const image2 = (req.files.image2 && req.files.image2[0] && req.files.image2[0].path) ? req.files.image2[0] : null
            const image3 = (req.files.image3 && req.files.image3[0] && req.files.image3[0].path) ? req.files.image3[0] : null
            const image4 = (req.files.image4 && req.files.image4[0] && req.files.image4[0].path) ? req.files.image4[0] : null

            // Only process images that are actually valid
            const imagesToUpload = []
            if (image1) {
                imagesToUpload.push(image1)
                console.log('Image 1 valid:', image1.path)
            }
            if (image2) {
                imagesToUpload.push(image2)
                console.log('Image 2 valid:', image2.path)
            }
            if (image3) {
                imagesToUpload.push(image3)
                console.log('Image 3 valid:', image3.path)
            }
            if (image4) {
                imagesToUpload.push(image4)
                console.log('Image 4 valid:', image4.path)
            }

            if (imagesToUpload.length > 0) {
                console.log('Uploading images:', imagesToUpload.length);
                
                let newImagesUrl = await Promise.all(
                    imagesToUpload.map(async (item) => {
                        console.log('Processing item:', item.path);
                        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                        return result.secure_url
                    })
                )

                // Start with existing images
                let updatedImages = [...product.image]
                
                // Replace images that were updated
                let urlIndex = 0
                if (image1) updatedImages[0] = newImagesUrl[urlIndex++]
                if (image2) updatedImages[1] = newImagesUrl[urlIndex++]
                if (image3) updatedImages[2] = newImagesUrl[urlIndex++]
                if (image4) updatedImages[3] = newImagesUrl[urlIndex++]
                
                product.image = updatedImages
            } else {
                console.log('No valid images to upload');
            }
        } else {
            console.log('No files object received');
        }

        await product.save()

        res.json({ success: true, message: "Product Updated Successfully" })

    } catch (error) {
        console.log('Update error:', error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct }