import { Entity } from '@/core/domain/Entity';

interface FloorMapGroundProps {
  size: {
    width: number;
    height: number;
    depth: number;
  };
  segments: {
    width: number;
    height: number;
    depth: number;
  };
  primaryColor: string;
  maps: {
    color: {
      url: string;
    };
    ao: {
      url: string;
      intensity: number;
    };
    displacement: {
      url: string;
      scale: number;
      bias: number;
    };
    normal: {
      url: string;
      tipo: number;
      scale: {
        x: number;
        y: number;
      };
    };
    bump: {
      url: string;
      scale: number;
    };
    roughness: {
      url: string;
      rough: number;
    };
  };
  wrapS: number;
  wrapT: number;
  repeat: {
    u: number;
    v: number;
  };
  magFilter: number;
  minFilter: number;
  secondaryColor: string;
}

export class FloorMapGround extends Entity<FloorMapGroundProps> {
  get size(): { width: number; height: number; depth: number } {
    return this.props.size;
  }

  get segments(): { width: number; height: number; depth: number } {
    return this.props.segments;
  }

  get primaryColor(): string {
    return this.props.primaryColor;
  }

  get maps(): {
    color: {
      url: string;
    };
    ao: {
      url: string;
      intensity: number;
    };
    displacement: {
      url: string;
      scale: number;
      bias: number;
    };
    normal: {
      url: string;
      tipo: number;
      scale: {
        x: number;
        y: number;
      };
    };
    bump: {
      url: string;
      scale: number;
    };
    roughness: {
      url: string;
      rough: number;
    };
  } {
    return this.props.maps;
  }

  get wrapS(): number {
    return this.props.wrapS;
  }

  get wrapT(): number {
    return this.props.wrapT;
  }

  get repeat(): { u: number; v: number } {
    return this.props.repeat;
  }

  get magFilter(): number {
    return this.props.magFilter;
  }

  get minFilter(): number {
    return this.props.minFilter;
  }

  get secondaryColor(): string {
    return this.props.secondaryColor;
  }

  private constructor(props: FloorMapGroundProps) {
    super(props);
  }

  public static create(props: FloorMapGroundProps): FloorMapGround {
    return new FloorMapGround(props);
  }
}
