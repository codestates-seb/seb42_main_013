import styled from "styled-components";

export const SpriteImage1 = styled.i`
  --imgBoxsize-: ${(props) => (props.wrappersize)};
  transform: ${(props) => props.horizon ?"rotate(90deg)" :null};
  background: url(${(props) => props.url}) no-repeat no-repeat;
  &.omega3 {
    background-position: 2.81% 96.711%;
    background-size: 250px 250px;
    --width-: 37;
    width: calc(var(--width-) * 1px);
    --height-: 98;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.capsule_red {
    background-position: 22.654% 96.646%;
    background-size: 250px 250px;
    --width-: 32;
    width: calc(var(--width-) * 1px);
    --height-: 86;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.ellipse_half_white {
    background-position: 40.92% 97.183%;
    background-size: 250px 250px;
    --width-: 33;
    width: calc(var(--width-) * 1px);
    --height-: 73;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.circle_brown {
    background-position: 59.765% 97.647%;
    background-size: 250px 250px;
    --width-: 38;
    width: calc(var(--width-) * 1px);
    --height-: 38;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.circle_yellow_1 {
    background-position: 97.297% 97.537%;
    background-size: 250px 250px;
    --width-: 47;
    width: calc(var(--width-) * 1px);
    --height-: 47;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.circle_pink {
    background-position: 60.471% 76.706%;
    background-size: 250px 250px;
    --width-: 38;
    width: calc(var(--width-) * 1px);
    --height-: 38;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.circle_white {
    background-position: 80.094% 72.664%;
    background-size: 250px 250px;
    --width-: 37;
    width: calc(var(--width-) * 1px);
    --height-: 36;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.omega3_2 {
    background-position: 64.486% 48.579%;
    background-size: 250px 250px;
    --width-: 36;
    width: calc(var(--width-) * 1px);
    --height-: 57;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.circle_yellowgreen {
    background-position: 1.624% 48.492%;
    background-size: 250px 250px;
    --width-: 35;
    width: calc(var(--width-) * 1px);
    --height-: 35;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.capsule_plain {
    background-position: 3.661% 4.878%;
    background-size: 250px 250px;
    --width-: 32;
    width: calc(var(--width-) * 1px);
    --height-: 86;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.capsule_brown {
    background-position: 20.982% 5.352%;
    background-size: 250px 250px;
    --width-: 26;
    width: calc(var(--width-) * 1px);
    --height-: 73;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.circle_small_yellow {
    background-position: 46.188% 44.719%;
    background-size: 250px 250px;
    --width-: 27;
    width: calc(var(--width-) * 1px);
    --height-: 28;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.circle_Mix_Pink {
    background-position: 71.845% 22.141%;
    background-size: 250px 250px;
    --width-: 44;
    width: calc(var(--width-) * 1px);
    --height-: 45;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.capsule_Orange {
    background-position: 98% 49.189%;
    background-size: 250px 250px;
    --width-: 25;
    width: calc(var(--width-) * 1px);
    --height-: 65;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.rhombus_white {
    background-position: 84.272% 48.446%;
    background-size: 250px 250px;
    --width-: 37;
    width: calc(var(--width-) * 1px);
    --height-: 57;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.half_spot {
    background-position: 36.706% 2.582%;
    background-size: 250px 250px;
    --width-: 38;
    width: calc(var(--width-) * 1px);
    --height-: 37;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
`;
export const SpriteImage2 = styled.i`
  --imgBoxsize-: ${(props) => (props.wrappersize)};
  transform: ${(props) => props.horizon ? null : "rotate(90deg)"};
  background: url(${(props) => props.url}) no-repeat no-repeat;
  &.capsule_green {
		transform: none;
    background-position: 4.553% 7.571%;
    background-size: 303px 206px;
    --width-: 18;
    width: calc(var(--width-) * 1px);
    --height-: 48;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.capsule_blue {
		transform: ${(props) => !props.horizon ? "rotate(180deg)" : "rotate(90deg)"};
    background-position: 16.696% 5.484%;
    background-size: 303px 206px;
    --width-: 19;
    width: calc(var(--width-) * 1px);
    --height-: 51;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.ellipse_pink {
    background-position: 35.701% 25.532%;
    background-size: 303px 206px;
    --width-: 43;
    width: calc(var(--width-) * 1px);
    --height-: 18;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.ellipse_white {
    background-position: 35.593% 77.836%;
    background-size: 303px 206px;
    --width-: 38;
    width: calc(var(--width-) * 1px);
    --height-: 17;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.ellipse_half_yellow {
    background-position: 62.4% 5.801%;
    background-size: calc(303px * 0.9) 210px;
    --width-: calc(53 * 1);
    width: calc(var(--width-) * 1px);
    --height-: 25;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.rhombus_spot {
    background-position: 35.453% 64.033%;
    background-size: 303px 206px;
    --width-: 44;
    width: calc(var(--width-) * 1px);
    --height-: 23;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.ellipse_blue {
    background-position: 62.795% 62.363%;
    background-size: 303px 206px;
    --width-: 49;
    width: calc(var(--width-) * 1px);
    --height-: 24;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.capsule_black {
    background-position: 8.113% 75%;
    background-size: 303px 206px;
    --width-: 38;
    width: calc(var(--width-) * 1px);
    --height-: 24;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
  &.half_circle {
    background-position: 81.25% 73.297%;
    background-size: 303px 206px;
    --width-: 23;
    width: calc(var(--width-) * 1px);
    --height-: 23;
    height: calc(var(--height-) * 1px);
    scale: calc(var(--imgBoxsize-) / max(var(--height-),var(--width-)));
  }
`;
