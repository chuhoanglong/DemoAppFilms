import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ImageProps,
  ImageResizeMode,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
} from 'react-native';
import {loadString, saveString} from '../../storage';

interface Props extends ImageProps {
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  source: ImageURISource;
  tintColor?: string;
  children?: React.ReactNode;
  type?: 'image' | 'icon' | 'imageBackground';
  onLoadEnd?: () => void;
}

const _ImageCacheWithUrl = ({
  type,
  style,
  tintColor,
  resizeMode = 'cover',
  source,
  onLoadEnd = () => {},
  ...rest
}: Props) => {
  const [cachedImage, setCachedImage] = useState<string>('');

  useEffect(() => {
    const loadImageFromCache = async () => {
      try {
        const imageUrl = source.uri;
        if (!imageUrl) {
          return null;
        }
        const imageId = 'IMAGE_CACHE_' + imageUrl.split('?')[0];
        // Kiểm tra xem ảnh đã được lưu trong cache hay chưa
        const cachedImageData = loadString(imageId);

        if (cachedImageData) {
          // Nếu đã có trong cache, sử dụng ảnh từ cache
          setCachedImage(cachedImageData);
        } else {
          // Nếu chưa có trong cache, tải ảnh từ URL và lưu vào cache
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onload = async () => {
            const base64Data =
              typeof reader.result === 'string'
                ? reader.result?.split(',')[1].toString()
                : '';
            setCachedImage(base64Data);
            if (base64Data) {
              saveString(imageId, base64Data);
            }
          };
          reader.readAsDataURL(blob);
        }
      } catch (error) {
        console.error('Error loading or caching image:', error);
      }
    };

    loadImageFromCache();
  }, [source]);

  if (!cachedImage) {
    return <ActivityIndicator size="small" animating={!cachedImage} />;
  }

  if (type === 'imageBackground') {
    return (
      <ImageBackground
        style={StyleSheet.flatten([style && style])}
        {...rest}
        source={{
          uri: `data:image/png;base64,${cachedImage}`,
        }}
        resizeMode={resizeMode}
        tintColor={tintColor}
        onLoadEnd={onLoadEnd}>
        {rest.children}
      </ImageBackground>
    );
  }

  return (
    <Image
      style={StyleSheet.flatten([style && style])}
      {...rest}
      source={{
        uri: `data:image/png;base64,${cachedImage}`,
      }}
      resizeMode={resizeMode}
      tintColor={tintColor}
      onLoadEnd={onLoadEnd}
    />
  );
};

export const ImageCacheWithUrl = React.memo(_ImageCacheWithUrl);
