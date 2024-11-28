"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const {handleUpload, deleteImage} = require("../../utils/uploadImages");
const db = require("../../models");

const getAllReviews = async (req) => {
   return await db.Review.findAll({
      attributes: [
         "review_id",
         "review_rating",
         "review_date",
         "review_comment",
         "is_locked",
         "last_lock_at",
         "route_id",
         "customer_id",
         "created_at",
         "updated_at",
      ],
      include: [
         {
            model: db.Route,
            as: "review_belongto_route",
            attributes: [
               "route_id",
               "route_name",
               "route_duration",
               "route_distance",
               "route_url_gps",
               "origin_office_id",
               "destination_office_id",
               "route_price",
               "is_default",
               "is_locked",
               "last_lock_at",
               "way_id",
            ],
         },
         {
            model: db.Customer,
            as: "review_belongto_customer",
            attributes: [
               "customer_id",
               "customer_full_name",
               "customer_phone",
               "customer_email",
               "customer_gender",
               "customer_birthday",
               "customer_avatar_url",
               "customer_avatar_public_id",
               "customer_destination_address",
               "customer_password",
               "is_disabled",
               "last_login_at",
               "customer_type_id",
            ],
         },
         {
            model: db.ReviewImage,
            as: "review_to_reviewImage",
            attributes: ["review_image_id", "review_id", "review_image_url", "review_image_public_id"],
         },
      ],
   })
      .then((reviews) => {
         if (!reviews || reviews.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - reviews not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {
            reviews,
            total: reviews.length,
         };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in getting all offices" + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

module.exports = {
   getAllReviews,
};
