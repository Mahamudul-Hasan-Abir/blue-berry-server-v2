import AppError from "../../Errors/AppError";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ProductServices } from "./product.service";
import httpStatus from "http-status";

const addProduct = catchAsync(async (req, res) => {
  const productData = req.body;

  // Attach the image URL from Cloudinary
  if (req.file) {
    productData.image = req.file.path; // The image URL will be in req.file.path
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Image file is required");
  }

  const result = await ProductServices.createProductIntoDB(productData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product added successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products are retrived successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product Id is Required");
  }
  const result = await ProductServices.getSingleProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Got single product successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product Id is Required");
  }
  const result = await ProductServices.updateSingleProductFromDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product Id is required");
  }
  const result = await ProductServices.deleteProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product deleted Successfully",
  });
});

const addReview = catchAsync(async (req, res) => {
  const productId = req.params?.id;
  const userId = req.userId;

  if (!productId || !userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product or User ID missing");
  }

  const result = await ProductServices.addReviewToProduct(
    productId,
    userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review added successfully",
    data: result,
  });
});

export const ProductControllers = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addReview,
};
