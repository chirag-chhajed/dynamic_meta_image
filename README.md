# Dynamic Meta Image

## Overview
The Dynamic Meta Tag Image Generator is a custom solution developed to enhance the visual representation of shared links on social media platforms. When users share their profile links on social media, the generator dynamically creates OpenGraph meta tag images on-demand. These images provide a captivating preview of the user's profile information, making the shared link more engaging and visually appealing.

## How it Works
1. **User Profile Information:** The Dynamic Meta Tag Image Generator takes user profile information, including their name, email, and website, as input.

2. **Redis Cache:** The generator first checks whether an image for the specific user already exists in the Redis cache. The cache stores pre-generated image URLs to optimize response times and reduce server load.

3. **Real-time Image Generation:** If the image for the user does not exist in the cache, the generator dynamically creates a personalized image in real-time using the "@napi-rs/canvas" npm package. The package provides the required functionalities to create and render images on-demand.

4. **Cloudinary Integration:** The freshly generated image is then uploaded to Cloudinary, a cloud-based media management platform. Cloudinary handles image storage and hosting, ensuring reliable and fast access to the images.

5. **URL Storage in Redis:** After uploading the image to Cloudinary, the generated image URL is stored in the Redis cache, associating it with the specific user's profile information. This step ensures faster access to the image in future requests for the same user.

## How to Use
1. **API Endpoint:** To generate dynamic meta tag images, access the serverless function API endpoint with the user's profile information (name, email, and website) as query parameters.

2. **Meta Tag Image:** The API will return the URL of the generated image. Use this URL as the "og:image" tag in your website's HTML to enable social media platforms to display the image when the link is shared.

## Technologies Used
- "@napi-rs/canvas": For real-time image generation and rendering.
- Cloudinary: For image hosting and management.
- Redis: For caching image URLs to optimize performance.
- Vercel: For serverless function deployment.

## Example
![Example](image.png)