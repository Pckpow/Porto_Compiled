# app.py

import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image
from StyleContentModel import StyleContentModel, tensor_to_image, train_step, clip_0_1

# Load the model
style_layers = ["block1_conv1", "block2_conv1", "block3_conv1", "block4_conv1", "block5_conv1"]
content_layers = ["block5_conv2"]
extractor = StyleContentModel(style_layers, content_layers)

# Function to perform style transfer
def style_transfer(content_image, style_image, num_epochs=10, steps_per_epoch=100):
    # Convert images to TensorFlow format
    content_image = tf.constant(load_img(content_image))
    style_image = tf.constant(load_img(style_image))

    # Set up the image for optimization
    image = tf.Variable(content_image)

    # Calculate style_targets and content_targets
    style_targets = extractor(style_image)['style']
    content_targets = extractor(content_image)['content']

    # Set up style and content weights
    style_weight = 1e-2
    content_weight = 1e4

    # Perform style transfer
    for _ in range(num_epochs):
        for _ in range(steps_per_epoch):
            train_step(image, extractor, style_targets, content_targets, style_weight, content_weight)

    # Convert the final image to PIL format
    result_image = tensor_to_image(image)

    return result_image

def load_img(path_to_img):
    max_dim = 512
    img = tf.io.read_file(path_to_img)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)

    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim

    new_shape = tf.cast(shape * scale, tf.int32)

    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :]
    return img

def main():
    st.title("Neural Style Transfer App")

    # Upload content and style images
    content_image = st.file_uploader("Upload Content Image", type=["jpg", "jpeg", "png"])
    style_image = st.file_uploader("Upload Style Image", type=["jpg", "jpeg", "png"])

    if content_image and style_image:
        # Save uploaded images to temporary files
        content_path = "content_image.jpg"
        style_path = "style_image.jpg"

        with open(content_path, "wb") as f:
            f.write(content_image.read())

        with open(style_path, "wb") as f:
            f.write(style_image.read())

        # Perform style transfer
        result = style_transfer(content_path, style_path)

        # Display the result
        st.image(result, caption="Stylized Image", use_column_width=True)
    else:
        st.warning("Please upload both content and style images.")

# Run the Streamlit app
if __name__ == "__main__":
    main()