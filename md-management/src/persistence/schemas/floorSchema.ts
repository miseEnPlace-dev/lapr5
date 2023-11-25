import mongoose from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const FloorMapSchema = new mongoose.Schema({
  domainId: {
    type: String
  },
  maze: {
    size: {
      width: Number,
      depth: Number
    },
    map: [[Number]],
    exits: [
      {
        type: {
          x: Number,
          y: Number,
          floorCode: String
        }
      }
    ],
    elevator: {
      type: {
        x: Number,
        y: Number
      }
    },
    exitLocation: {
      type: {
        x: Number,
        y: Number
      }
    }
  },
  player: {
    initialPosition: {
      x: Number,
      y: Number
    },
    initialDirection: Number
  },
  door: {
    url: String,
    scale: {
      x: Number,
      y: Number,
      z: Number
    }
  },
  elevator: {
    url: String,
    scale: {
      x: Number,
      y: Number,
      z: Number
    }
  },
  wall: {
    segments: {
      width: Number,
      height: Number,
      depth: Number
    },
    primaryColor: String,
    maps: {
      color: {
        url: String
      },
      ao: {
        url: String,
        intensity: Number
      },
      displacement: {
        url: String,
        scale: Number,
        bias: Number
      },
      normal: {
        url: String,
        tipo: Number,
        scale: {
          x: Number,
          y: Number
        }
      },
      bump: {
        url: String,
        scale: Number
      },
      roughness: {
        url: String,
        rough: Number
      }
    },
    wrapS: Number,
    wrapT: Number,
    repeat: {
      u: Number,
      v: Number
    },
    magFilter: Number,
    minFilter: Number,
    secondaryColor: String
  },
  ground: {
    size: {
      width: Number,
      height: Number,
      depth: Number
    },
    segments: {
      width: Number,
      height: Number,
      depth: Number
    },
    primaryColor: String,
    maps: {
      color: {
        url: String
      },
      ao: {
        url: String,
        intensity: Number
      },
      displacement: {
        url: String,
        scale: Number,
        bias: Number
      },
      normal: {
        url: String,
        tipo: Number,
        scale: {
          x: Number,
          y: Number
        }
      },
      bump: {
        url: String,
        scale: Number
      },
      roughness: {
        url: String,
        rough: Number
      }
    },
    wrapS: Number,
    wrapT: Number,
    repeat: {
      u: Number,
      v: Number
    },
    magFilter: Number,
    minFilter: Number,
    secondaryColor: String
  }
});

const FloorSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    code: {
      type: String,
      unique: true
    },

    description: String,

    dimensions: {
      width: Number,
      length: Number
    },
    map: FloorMapSchema,

    buildingCode: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);
