import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
  index: number;
  shuffleBack: Animated.SharedValue<boolean>;
}

const {width, height} = Dimensions.get('window');

const SNAP_POINTS = [-width, 0, width];
const aspectRatio = 722 / 368;
const CARD_WIDTH = width - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;

const Card = ({card: {source}, shuffleBack, index}: CardProps) => {
  const offset = useSharedValue({x: 0, y: 0});
  const x = useSharedValue(0);
  const y = useSharedValue(-height);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const delay = index * DURATION;
  const theta = -10 + Math.random() * 20;
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({translateX, translateY}: any) => {
      x.value = translateX;
      y.value = translateY;
    },
  });

  const style = useAnimatedStyle(()=>({
    transform: [
      {translateX: x.value},
      {translateY: y.value}
    ]
  }))

  console.log(StyleSheet.absoluteFillObject);
  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.card]}>
          <Image
            source={source}
            style={{width: IMAGE_WIDTH, height: IMAGE_WIDTH * aspectRatio}}
            resizeMode="contain"
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
