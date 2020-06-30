import tensorflow as tf
import IPython.display as display

import matplotlib.pyplot as plt
import matplotlib as mpl

import numpy as np
import PIL.Image
import time
import functools

import sys

#content_path = sys.argv[1]
#style_path = sys.argv[2]

def tensor_to_image(tensor):
    tensor = tensor*255
    tensor = np.array(tensor, dtype=np.uint8)
    if np.ndim(tensor)>3:
        assert tensor.shape[0] == 1
        tensor = tensor[0]
    return PIL.Image.fromarray(tensor)




#content_path = tf.keras.utils.get_file('YellowLabradorLooking_new.jpg', 'https://storage.googleapis.com/download.tensorflow.org/example_images/YellowLabradorLooking_new.jpg')

# https://commons.wikimedia.org/wiki/File:Vassily_Kandinsky,_1913_-_Composition_7.jpg
#style_path = tf.keras.utils.get_file('kandinsky5.jpg','https://storage.googleapis.com/download.tensorflow.org/example_images/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg')

# content_path = '../sachin.jpg'
#style_path = '../the-dark-side-of-the-moon.jpeg'
content_path = str(sys.argv[1])
# style_path = '../BGN.jpg'
# content_path = '../starry-night.jpg'
# style_path = '../impression.jpg'
style_path = str(sys.argv[2])





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



content_image = load_img(content_path)
style_image = load_img(style_path)





import tensorflow_hub as hub
hub_module = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')
stylized_image = hub_module(tf.constant(content_image), tf.constant(style_image))[0]

print(type(stylized_image))


from PIL import Image

arg1 = (str(sys.argv[1]).split("-")[1]).split(".")[0]
arg2 = (str(sys.argv[2]).split("-")[1]).split(".")[0]



tf.keras.preprocessing.image.save_img('public/images/result/' + arg1 + "-" + arg2 + '.png', stylized_image[0])



