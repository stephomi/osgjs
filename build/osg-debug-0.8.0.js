/** -*- compile-command: 'jslint-cli osg.js' -*- */

define( [
    'osg/BlendColor',
    'osg/BlendFunc',
    'osg/BoundingBox',
    'osg/BoundingSphere',
    'osg/BufferArray',
    'osg/Camera',
    'osg/ComputeMatrixFromNodePath',
    'osg/CullFace',
    'osg/CullSettings',
    'osg/CullStack',
    'osg/CullVisitor',
    'osg/Depth',
    'osg/DrawArrayLengths',
    'osg/DrawArrays',
    'osg/DrawElements',
    'osg/EllipsoidModel',
    'osg/FrameBufferObject',
    'osg/FrameStamp',
    'osg/Geometry',
    'osg/Image',
    'osg/Light',
    'osg/LightSource',
    'osg/LineWidth',
    'osg/Material',
    'osg/Math',
    'osg/Matrix',
    'osg/MatrixTransform',
    'osg/Node',
    'osg/NodeVisitor',
    'osg/Notify',
    'osg/Object',
    'osg/PrimitiveSet',
    'osg/Program',
    'osg/Projection',
    'osg/Quat',
    'osg/RenderBin',
    'osg/RenderStage',
    'osg/Shader',
    'osg/ShaderGenerator',
    'osg/Shape',
    'osg/Stack',
    'osg/State',
    'osg/StateAttribute',
    'osg/StateGraph',
    'osg/StateSet',
    'osg/Texture',
    'osg/TextureCubeMap',
    'osg/Transform',
    'osg/Uniform',
    'osg/UpdateVisitor',
    'osg/Utils',
    'osg/Vec2',
    'osg/Vec3',
    'osg/Vec4',
    'osg/Viewport'
], function ( BlendColor, BlendFunc, BoundingBox, BoundingSphere, BufferArray, Camera, ComputeMatrixFromNodePath, CullFace, CullSettings, CullStack, CullVisitor, Depth, DrawArrayLengths, DrawArrays, DrawElements, EllipsoidModel, FrameBufferObject, FrameStamp, Geometry, Image, Light, LightSource, LineWidth, Material, Math, Matrix, MatrixTransform, Node, NodeVisitor, Notify, Object, PrimitiveSet, Program, Projection, Quat, RenderBin, RenderStage, Shader, ShaderGenerator, Shape, Stack, State, StateAttribute, StateGraph, StateSet, Texture, TextureCubeMap, Transform, Uniform, UpdateVisitor, Utils, Vec2, Vec3, Vec4, Viewport ) {

    var osg = {};

    osg.BlendColor = BlendColor;
    osg.BlendFunc = BlendFunc;
    osg.BoundingBox = BoundingBox;
    osg.BoundingSphere = BoundingSphere;
    osg.BufferArray = BufferArray;
    osg.Camera = Camera;
    osg.ComputeMatrixFromNodePath = ComputeMatrixFromNodePath;
    osg.CullFace = CullFace;
    osg.CullSettings = CullSettings;
    osg.CullStack = CullStack;
    osg.CullVisitor = CullVisitor;
    osg.Depth = Depth;
    osg.DrawArrayLengths = DrawArrayLengths;
    osg.DrawArrays = DrawArrays;
    osg.DrawElements = DrawElements;
    osg.EllipsoidModel = EllipsoidModel;
    osg.FrameBufferObject = FrameBufferObject;
    osg.FrameStamp = FrameStamp;
    osg.Geometry = Geometry;
    osg.Image = Image;
    osg.Light = Light;
    osg.LightSource = LightSource;
    osg.LineWidth = LineWidth;
    osg.Material = Material;
    osg.Math = Math;
    osg.Matrix = Matrix;
    osg.MatrixTransform = MatrixTransform;
    osg.Node = Node;
    osg.NodeVisitor = NodeVisitor;
    osg.Notify = Notify;
    osg.Object = Object;
    osg.PrimitiveSet = PrimitiveSet;
    osg.Program = Program;
    osg.Projection = Projection;
    osg.Quat = Quat;
    osg.RenderBin = RenderBin;
    osg.RenderStage = RenderStage;
    osg.Shader = Shader;
    osg.ShaderGenerator = ShaderGenerator;
    osg.Shape = Shape;
    osg.Stack = Stack;
    osg.State = State;
    osg.StateAttribute = StateAttribute;
    osg.StateGraph = StateGraph;
    osg.StateSet = StateSet;
    osg.Texture = Texture;
    osg.TextureCubeMap = TextureCubeMap;
    osg.Transform = Transform;
    osg.Uniform = Uniform;
    osg.UpdateVisitor = UpdateVisitor;
    osg.Utils = Utils;
    osg.Vec2 = Vec2;
    osg.Vec3 = Vec3;
    osg.Vec4 = Vec4;
    osg.Viewport = Viewport;

    return osg;
} );
/*global define */

define( [], function () {

    /** @class Vec2 Operations */
    var Vec2 = {
        copy: function ( a, r ) {
            r[ 0 ] = a[ 0 ];
            r[ 1 ] = a[ 1 ];
            return r;
        },

        valid: function ( a ) {
            if ( isNaN( a[ 0 ] ) ) {
                return false;
            }
            if ( isNaN( a[ 1 ] ) ) {
                return false;
            }
            return true;
        },

        mult: function ( a, b, r ) {
            r[ 0 ] = a[ 0 ] * b;
            r[ 1 ] = a[ 1 ] * b;
            return r;
        },

        length2: function ( a ) {
            return a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ];
        },

        length: function ( a ) {
            return Math.sqrt( a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ] );
        },

        distance: function ( a, b ) {
            var x = a[ 0 ] - b[ 0 ];
            var y = a[ 1 ] - b[ 1 ];
            return Math.sqrt( x * x + y * y );
        },

        /** 
        normalize an Array of 2 elements and write it in r
     */
        normalize: function ( a, r ) {
            var norm = this.length2( a );
            if ( norm > 0.0 ) {
                var inv = 1.0 / Math.sqrt( norm );
                r[ 0 ] = a[ 0 ] * inv;
                r[ 1 ] = a[ 1 ] * inv;
            } else {
                r[ 0 ] = a[ 0 ];
                r[ 1 ] = a[ 1 ];
            }
            return r;
        },

        /** 
        Compute the dot product 
    */
        dot: function ( a, b ) {
            return a[ 0 ] * b[ 0 ] + a[ 1 ] * b[ 1 ];
        },

        /**
       Compute a - b and put the result in r
     */
        sub: function ( a, b, r ) {
            r[ 0 ] = a[ 0 ] - b[ 0 ];
            r[ 1 ] = a[ 1 ] - b[ 1 ];
            return r;
        },

        add: function ( a, b, r ) {
            r[ 0 ] = a[ 0 ] + b[ 0 ];
            r[ 1 ] = a[ 1 ] + b[ 1 ];
            return r;
        },

        neg: function ( a, r ) {
            r[ 0 ] = -a[ 0 ];
            r[ 1 ] = -a[ 1 ];
            return r;
        },

        lerp: function ( t, a, b, r ) {
            var tmp = 1.0 - t;
            r[ 0 ] = a[ 0 ] * tmp + t * b[ 0 ];
            r[ 1 ] = a[ 1 ] * tmp + t * b[ 1 ];
            return r;
        }

    };

    return Vec2;
} );
/*global define */

define( [], function () {

    /** @class Vec3 Operations */
    var Vec3 = {
        init: function ( a ) {
            a[ 0 ] = 0.0;
            a[ 1 ] = 0.0;
            a[ 2 ] = 0.0;
            return a;
        },

        copy: function ( a, r ) {
            r[ 0 ] = a[ 0 ];
            r[ 1 ] = a[ 1 ];
            r[ 2 ] = a[ 2 ];
            return r;
        },

        cross: function ( a, b, r ) {
            var x = a[ 1 ] * b[ 2 ] - a[ 2 ] * b[ 1 ];
            var y = a[ 2 ] * b[ 0 ] - a[ 0 ] * b[ 2 ];
            var z = a[ 0 ] * b[ 1 ] - a[ 1 ] * b[ 0 ];
            r[ 0 ] = x;
            r[ 1 ] = y;
            r[ 2 ] = z;
            return r;
        },

        valid: function ( a ) {
            if ( isNaN( a[ 0 ] ) ) {
                return false;
            }
            if ( isNaN( a[ 1 ] ) ) {
                return false;
            }
            if ( isNaN( a[ 2 ] ) ) {
                return false;
            }
            return true;
        },

        mult: function ( a, b, r ) {
            r[ 0 ] = a[ 0 ] * b;
            r[ 1 ] = a[ 1 ] * b;
            r[ 2 ] = a[ 2 ] * b;
            return r;
        },

        length2: function ( a ) {
            return a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ] + a[ 2 ] * a[ 2 ];
        },

        length: function ( a ) {
            return Math.sqrt( a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ] + a[ 2 ] * a[ 2 ] );
        },

        distance: function ( a, b ) {
            var x = a[ 0 ] - b[ 0 ];
            var y = a[ 1 ] - b[ 1 ];
            var z = a[ 2 ] - b[ 2 ];
            return Math.sqrt( x * x + y * y + z * z );
        },

        normalize: function ( a, r ) {
            var norm = this.length2( a );
            if ( norm > 0.0 ) {
                var inv = 1.0 / Math.sqrt( norm );
                r[ 0 ] = a[ 0 ] * inv;
                r[ 1 ] = a[ 1 ] * inv;
                r[ 2 ] = a[ 2 ] * inv;
            } else {
                r[ 0 ] = a[ 0 ];
                r[ 1 ] = a[ 1 ];
                r[ 2 ] = a[ 2 ];
            }
            return r;
        },

        dot: function ( a, b ) {
            return a[ 0 ] * b[ 0 ] + a[ 1 ] * b[ 1 ] + a[ 2 ] * b[ 2 ];
        },

        sub: function ( a, b, r ) {
            r[ 0 ] = a[ 0 ] - b[ 0 ];
            r[ 1 ] = a[ 1 ] - b[ 1 ];
            r[ 2 ] = a[ 2 ] - b[ 2 ];
            return r;
        },

        add: function ( a, b, r ) {
            r[ 0 ] = a[ 0 ] + b[ 0 ];
            r[ 1 ] = a[ 1 ] + b[ 1 ];
            r[ 2 ] = a[ 2 ] + b[ 2 ];
            return r;
        },

        neg: function ( a, r ) {
            r[ 0 ] = -a[ 0 ];
            r[ 1 ] = -a[ 1 ];
            r[ 2 ] = -a[ 2 ];
            return r;
        },

        lerp: function ( t, a, b, r ) {
            r[ 0 ] = a[ 0 ] + ( b[ 0 ] - a[ 0 ] ) * t;
            r[ 1 ] = a[ 1 ] + ( b[ 1 ] - a[ 1 ] ) * t;
            r[ 2 ] = a[ 2 ] + ( b[ 2 ] - a[ 2 ] ) * t;
            return r;
        }

    };

    return Vec3;
} );
/*global define */

define( [], function () {

    /** @class Vec4 Operations */
    var Vec4 = {

        dot: function ( a, b ) {
            return a[ 0 ] * b[ 0 ] + a[ 1 ] * b[ 1 ] + a[ 2 ] * b[ 2 ] + a[ 3 ] * b[ 3 ];
        },

        copy: function ( a, r ) {
            r[ 0 ] = a[ 0 ];
            r[ 1 ] = a[ 1 ];
            r[ 2 ] = a[ 2 ];
            r[ 3 ] = a[ 3 ];
            return r;
        },

        sub: function ( a, b, r ) {
            r[ 0 ] = a[ 0 ] - b[ 0 ];
            r[ 1 ] = a[ 1 ] - b[ 1 ];
            r[ 2 ] = a[ 2 ] - b[ 2 ];
            r[ 3 ] = a[ 3 ] - b[ 3 ];
            return r;
        },

        mult: function ( a, b, result ) {
            r[ 0 ] = a[ 0 ] * b;
            r[ 1 ] = a[ 1 ] * b;
            r[ 2 ] = a[ 2 ] * b;
            r[ 3 ] = a[ 3 ] * b;
            return r;
        },

        add: function ( a, b, r ) {
            r[ 0 ] = a[ 0 ] + b[ 0 ];
            r[ 1 ] = a[ 1 ] + b[ 1 ];
            r[ 2 ] = a[ 2 ] + b[ 2 ];
            r[ 3 ] = a[ 3 ] + b[ 3 ];
            return r;
        },

        neg: function ( a, r ) {
            r[ 0 ] = -a[ 0 ];
            r[ 1 ] = -a[ 1 ];
            r[ 2 ] = -a[ 2 ];
            r[ 3 ] = -a[ 3 ];
            return r;
        },

        lerp: function ( t, a, b, r ) {
            var tmp = 1.0 - t;
            r[ 0 ] = a[ 0 ] * tmp + t * b[ 0 ];
            r[ 1 ] = a[ 1 ] * tmp + t * b[ 1 ];
            r[ 2 ] = a[ 2 ] * tmp + t * b[ 2 ];
            r[ 3 ] = a[ 3 ] * tmp + t * b[ 3 ];
            return r;
        }
    };

    return Vec4;
} );
/*global define */

define( [
    'osg/Utils'
], function ( MACROUTILS ) {

    /** -*- compile-command: 'jslint-cli Object.js' -*- */

    /**
     *  Object class
     *  @class Object
     */
    var Object = function () {
        this._name = undefined;
        this._userdata = undefined;
        this._instanceID = Object.getInstanceID();
    };

    /** @lends Object.prototype */
    Object.prototype = MACROUTILS.objectLibraryClass( {
            getInstanceID: function () {
                return this._instanceID;
            },
            setName: function ( name ) {
                this._name = name;
            },
            getName: function () {
                return this._name;
            },
            setUserData: function ( data ) {
                this._userdata = data;
            },
            getUserData: function () {
                return this._userdata;
            }
        },
        'osg', 'Object' );


    // get an instanceID for each object
    ( function () {
        var instanceID = 0;
        Object.getInstanceID = function () {
            instanceID += 1;
            return instanceID;
        };
    } )();

    return Object;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Vec3',
    'osg/Vec4',
    'osg/Quat'
], function ( Notify, Vec3, Vec4, Quat ) {

    /** @class Matrix Operations */
    var Matrix = {
        _tmp0: [],
        _tmp1: [],
        valid: function ( matrix ) {
            for ( var i = 0; i < 16; i++ ) {
                if ( isNaN( matrix[ i ] ) ) {
                    return false;
                }
            }
            return true;
        },
        setRow: function ( matrix, row, v0, v1, v2, v3 ) {
            var rowIndex = row * 4;
            matrix[ rowIndex + 0 ] = v0;
            matrix[ rowIndex + 1 ] = v1;
            matrix[ rowIndex + 2 ] = v2;
            matrix[ rowIndex + 3 ] = v3;
        },
        innerProduct: function ( a, b, r, c ) {
            var rIndex = r * 4;
            return ( ( a[ rIndex + 0 ] * b[ 0 + c ] ) + ( a[ rIndex + 1 ] * b[ 4 + c ] ) + ( a[ rIndex + 2 ] * b[ 8 + c ] ) + ( a[ rIndex + 3 ] * b[ 12 + c ] ) );
        },

        set: function ( matrix, row, col, value ) {
            matrix[ row * 4 + col ] = value;
            return value;
        },

        get: function ( matrix, row, col ) {
            return matrix[ row * 4 + col ];
        },

        makeIdentity: function ( matrix ) {
            if ( matrix === undefined ) {
                matrix = [];
                Notify.log( 'Matrix.makeIdentity without matrix destination is deprecated' );
            }
            Matrix.setRow( matrix, 0, 1.0, 0.0, 0.0, 0.0 );
            Matrix.setRow( matrix, 1, 0.0, 1.0, 0.0, 0.0 );
            Matrix.setRow( matrix, 2, 0.0, 0.0, 1.0, 0.0 );
            Matrix.setRow( matrix, 3, 0.0, 0.0, 0.0, 1.0 );
            return matrix;
        },

        /**
         * @param {Number} x position
         * @param {Number} y position
         * @param {Number} z position
         * @param {Array} matrix to write result
         */
        makeTranslate: function ( x, y, z, matrix ) {
            if ( matrix === undefined ) {
                matrix = [];
            }
            Matrix.setRow( matrix, 0, 1.0, 0.0, 0.0, 0.0 );
            Matrix.setRow( matrix, 1, 0.0, 1.0, 0.0, 0.0 );
            Matrix.setRow( matrix, 2, 0.0, 0.0, 1.0, 0.0 );
            Matrix.setRow( matrix, 3, x, y, z, 1.0 );
            return matrix;
        },

        setTrans: function ( matrix, x, y, z ) {
            matrix[ 12 ] = x;
            matrix[ 13 ] = y;
            matrix[ 14 ] = z;
            return matrix;
        },

        getTrans: function ( matrix, result ) {
            result[ 0 ] = matrix[ 12 ];
            result[ 1 ] = matrix[ 13 ];
            result[ 2 ] = matrix[ 14 ];
            return result;
        },

        // do a * b and result in a
        preMult: function ( a, b ) {
            var atmp0, atmp1, atmp2, atmp3;

            atmp0 = ( b[ 0 ] * a[ 0 ] ) + ( b[ 1 ] * a[ 4 ] ) + ( b[ 2 ] * a[ 8 ] ) + ( b[ 3 ] * a[ 12 ] );
            atmp1 = ( b[ 4 ] * a[ 0 ] ) + ( b[ 5 ] * a[ 4 ] ) + ( b[ 6 ] * a[ 8 ] ) + ( b[ 7 ] * a[ 12 ] );
            atmp2 = ( b[ 8 ] * a[ 0 ] ) + ( b[ 9 ] * a[ 4 ] ) + ( b[ 10 ] * a[ 8 ] ) + ( b[ 11 ] * a[ 12 ] );
            atmp3 = ( b[ 12 ] * a[ 0 ] ) + ( b[ 13 ] * a[ 4 ] ) + ( b[ 14 ] * a[ 8 ] ) + ( b[ 15 ] * a[ 12 ] );
            a[ 0 ] = atmp0;
            a[ 4 ] = atmp1;
            a[ 8 ] = atmp2;
            a[ 12 ] = atmp3;

            atmp0 = ( b[ 0 ] * a[ 1 ] ) + ( b[ 1 ] * a[ 5 ] ) + ( b[ 2 ] * a[ 9 ] ) + ( b[ 3 ] * a[ 13 ] );
            atmp1 = ( b[ 4 ] * a[ 1 ] ) + ( b[ 5 ] * a[ 5 ] ) + ( b[ 6 ] * a[ 9 ] ) + ( b[ 7 ] * a[ 13 ] );
            atmp2 = ( b[ 8 ] * a[ 1 ] ) + ( b[ 9 ] * a[ 5 ] ) + ( b[ 10 ] * a[ 9 ] ) + ( b[ 11 ] * a[ 13 ] );
            atmp3 = ( b[ 12 ] * a[ 1 ] ) + ( b[ 13 ] * a[ 5 ] ) + ( b[ 14 ] * a[ 9 ] ) + ( b[ 15 ] * a[ 13 ] );
            a[ 1 ] = atmp0;
            a[ 5 ] = atmp1;
            a[ 9 ] = atmp2;
            a[ 13 ] = atmp3;

            atmp0 = ( b[ 0 ] * a[ 2 ] ) + ( b[ 1 ] * a[ 6 ] ) + ( b[ 2 ] * a[ 10 ] ) + ( b[ 3 ] * a[ 14 ] );
            atmp1 = ( b[ 4 ] * a[ 2 ] ) + ( b[ 5 ] * a[ 6 ] ) + ( b[ 6 ] * a[ 10 ] ) + ( b[ 7 ] * a[ 14 ] );
            atmp2 = ( b[ 8 ] * a[ 2 ] ) + ( b[ 9 ] * a[ 6 ] ) + ( b[ 10 ] * a[ 10 ] ) + ( b[ 11 ] * a[ 14 ] );
            atmp3 = ( b[ 12 ] * a[ 2 ] ) + ( b[ 13 ] * a[ 6 ] ) + ( b[ 14 ] * a[ 10 ] ) + ( b[ 15 ] * a[ 14 ] );
            a[ 2 ] = atmp0;
            a[ 6 ] = atmp1;
            a[ 10 ] = atmp2;
            a[ 14 ] = atmp3;

            atmp0 = ( b[ 0 ] * a[ 3 ] ) + ( b[ 1 ] * a[ 7 ] ) + ( b[ 2 ] * a[ 11 ] ) + ( b[ 3 ] * a[ 15 ] );
            atmp1 = ( b[ 4 ] * a[ 3 ] ) + ( b[ 5 ] * a[ 7 ] ) + ( b[ 6 ] * a[ 11 ] ) + ( b[ 7 ] * a[ 15 ] );
            atmp2 = ( b[ 8 ] * a[ 3 ] ) + ( b[ 9 ] * a[ 7 ] ) + ( b[ 10 ] * a[ 11 ] ) + ( b[ 11 ] * a[ 15 ] );
            atmp3 = ( b[ 12 ] * a[ 3 ] ) + ( b[ 13 ] * a[ 7 ] ) + ( b[ 14 ] * a[ 11 ] ) + ( b[ 15 ] * a[ 15 ] );
            a[ 3 ] = atmp0;
            a[ 7 ] = atmp1;
            a[ 11 ] = atmp2;
            a[ 15 ] = atmp3;

            return a;
        },

        // do a * b and result in b
        postMult: function ( a, b ) {
            // post mult
            btmp0 = ( b[ 0 ] * a[ 0 ] ) + ( b[ 1 ] * a[ 4 ] ) + ( b[ 2 ] * a[ 8 ] ) + ( b[ 3 ] * a[ 12 ] );
            btmp1 = ( b[ 0 ] * a[ 1 ] ) + ( b[ 1 ] * a[ 5 ] ) + ( b[ 2 ] * a[ 9 ] ) + ( b[ 3 ] * a[ 13 ] );
            btmp2 = ( b[ 0 ] * a[ 2 ] ) + ( b[ 1 ] * a[ 6 ] ) + ( b[ 2 ] * a[ 10 ] ) + ( b[ 3 ] * a[ 14 ] );
            btmp3 = ( b[ 0 ] * a[ 3 ] ) + ( b[ 1 ] * a[ 7 ] ) + ( b[ 2 ] * a[ 11 ] ) + ( b[ 3 ] * a[ 15 ] );
            b[ 0 ] = btmp0;
            b[ 1 ] = btmp1;
            b[ 2 ] = btmp2;
            b[ 3 ] = btmp3;

            btmp0 = ( b[ 4 ] * a[ 0 ] ) + ( b[ 5 ] * a[ 4 ] ) + ( b[ 6 ] * a[ 8 ] ) + ( b[ 7 ] * a[ 12 ] );
            btmp1 = ( b[ 4 ] * a[ 1 ] ) + ( b[ 5 ] * a[ 5 ] ) + ( b[ 6 ] * a[ 9 ] ) + ( b[ 7 ] * a[ 13 ] );
            btmp2 = ( b[ 4 ] * a[ 2 ] ) + ( b[ 5 ] * a[ 6 ] ) + ( b[ 6 ] * a[ 10 ] ) + ( b[ 7 ] * a[ 14 ] );
            btmp3 = ( b[ 4 ] * a[ 3 ] ) + ( b[ 5 ] * a[ 7 ] ) + ( b[ 6 ] * a[ 11 ] ) + ( b[ 7 ] * a[ 15 ] );
            b[ 4 ] = btmp0;
            b[ 5 ] = btmp1;
            b[ 6 ] = btmp2;
            b[ 7 ] = btmp3;

            btmp0 = ( b[ 8 ] * a[ 0 ] ) + ( b[ 9 ] * a[ 4 ] ) + ( b[ 10 ] * a[ 8 ] ) + ( b[ 11 ] * a[ 12 ] );
            btmp1 = ( b[ 8 ] * a[ 1 ] ) + ( b[ 9 ] * a[ 5 ] ) + ( b[ 10 ] * a[ 9 ] ) + ( b[ 11 ] * a[ 13 ] );
            btmp2 = ( b[ 8 ] * a[ 2 ] ) + ( b[ 9 ] * a[ 6 ] ) + ( b[ 10 ] * a[ 10 ] ) + ( b[ 11 ] * a[ 14 ] );
            btmp3 = ( b[ 8 ] * a[ 3 ] ) + ( b[ 9 ] * a[ 7 ] ) + ( b[ 10 ] * a[ 11 ] ) + ( b[ 11 ] * a[ 15 ] );
            b[ 8 ] = btmp0;
            b[ 9 ] = btmp1;
            b[ 10 ] = btmp2;
            b[ 11 ] = btmp3;

            btmp0 = ( b[ 12 ] * a[ 0 ] ) + ( b[ 13 ] * a[ 4 ] ) + ( b[ 14 ] * a[ 8 ] ) + ( b[ 15 ] * a[ 12 ] );
            btmp1 = ( b[ 12 ] * a[ 1 ] ) + ( b[ 13 ] * a[ 5 ] ) + ( b[ 14 ] * a[ 9 ] ) + ( b[ 15 ] * a[ 13 ] );
            btmp2 = ( b[ 12 ] * a[ 2 ] ) + ( b[ 13 ] * a[ 6 ] ) + ( b[ 14 ] * a[ 10 ] ) + ( b[ 15 ] * a[ 14 ] );
            btmp3 = ( b[ 12 ] * a[ 3 ] ) + ( b[ 13 ] * a[ 7 ] ) + ( b[ 14 ] * a[ 11 ] ) + ( b[ 15 ] * a[ 15 ] );
            b[ 12 ] = btmp0;
            b[ 13 ] = btmp1;
            b[ 14 ] = btmp2;
            b[ 15 ] = btmp3;

            return b;
        },
        multa: function ( a, b, r ) {
            if ( r === a ) {
                return this.preMult( a, b );
            } else if ( r === b ) {
                return this.postMult( a, b );
            } else {
                if ( r === undefined ) {
                    r = [];
                }
                r[ 0 ] = b[ 0 ] * a[ 0 ] + b[ 1 ] * a[ 4 ] + b[ 2 ] * a[ 8 ] + b[ 3 ] * a[ 12 ];
                r[ 1 ] = b[ 0 ] * a[ 1 ] + b[ 1 ] * a[ 5 ] + b[ 2 ] * a[ 9 ] + b[ 3 ] * a[ 13 ];
                r[ 2 ] = b[ 0 ] * a[ 2 ] + b[ 1 ] * a[ 6 ] + b[ 2 ] * a[ 10 ] + b[ 3 ] * a[ 14 ];
                r[ 3 ] = b[ 0 ] * a[ 3 ] + b[ 1 ] * a[ 7 ] + b[ 2 ] * a[ 11 ] + b[ 3 ] * a[ 15 ];

                r[ 4 ] = b[ 4 ] * a[ 0 ] + b[ 5 ] * a[ 4 ] + b[ 6 ] * a[ 8 ] + b[ 7 ] * a[ 12 ];
                r[ 5 ] = b[ 4 ] * a[ 1 ] + b[ 5 ] * a[ 5 ] + b[ 6 ] * a[ 9 ] + b[ 7 ] * a[ 13 ];
                r[ 6 ] = b[ 4 ] * a[ 2 ] + b[ 5 ] * a[ 6 ] + b[ 6 ] * a[ 10 ] + b[ 7 ] * a[ 14 ];
                r[ 7 ] = b[ 4 ] * a[ 3 ] + b[ 5 ] * a[ 7 ] + b[ 6 ] * a[ 11 ] + b[ 7 ] * a[ 15 ];

                r[ 8 ] = b[ 8 ] * a[ 0 ] + b[ 9 ] * a[ 4 ] + b[ 10 ] * a[ 8 ] + b[ 11 ] * a[ 12 ];
                r[ 9 ] = b[ 8 ] * a[ 1 ] + b[ 9 ] * a[ 5 ] + b[ 10 ] * a[ 9 ] + b[ 11 ] * a[ 13 ];
                r[ 10 ] = b[ 8 ] * a[ 2 ] + b[ 9 ] * a[ 6 ] + b[ 10 ] * a[ 10 ] + b[ 11 ] * a[ 14 ];
                r[ 11 ] = b[ 8 ] * a[ 3 ] + b[ 9 ] * a[ 7 ] + b[ 10 ] * a[ 11 ] + b[ 11 ] * a[ 15 ];

                r[ 12 ] = b[ 12 ] * a[ 0 ] + b[ 13 ] * a[ 4 ] + b[ 14 ] * a[ 8 ] + b[ 15 ] * a[ 12 ];
                r[ 13 ] = b[ 12 ] * a[ 1 ] + b[ 13 ] * a[ 5 ] + b[ 14 ] * a[ 9 ] + b[ 15 ] * a[ 13 ];
                r[ 14 ] = b[ 12 ] * a[ 2 ] + b[ 13 ] * a[ 6 ] + b[ 14 ] * a[ 10 ] + b[ 15 ] * a[ 14 ];
                r[ 15 ] = b[ 12 ] * a[ 3 ] + b[ 13 ] * a[ 7 ] + b[ 14 ] * a[ 11 ] + b[ 15 ] * a[ 15 ];

                return r;
            }
        },
        /* r = a * b */
        mult: function ( a, b, r ) {
            var s00 = b[ 0 ];
            var s01 = b[ 1 ];
            var s02 = b[ 2 ];
            var s03 = b[ 3 ];
            var s10 = b[ 4 ];
            var s11 = b[ 5 ];
            var s12 = b[ 6 ];
            var s13 = b[ 7 ];
            var s20 = b[ 8 ];
            var s21 = b[ 9 ];
            var s22 = b[ 10 ];
            var s23 = b[ 11 ];
            var s30 = b[ 12 ];
            var s31 = b[ 13 ];
            var s32 = b[ 14 ];
            var s33 = b[ 15 ];

            var o00 = a[ 0 ];
            var o01 = a[ 1 ];
            var o02 = a[ 2 ];
            var o03 = a[ 3 ];
            var o10 = a[ 4 ];
            var o11 = a[ 5 ];
            var o12 = a[ 6 ];
            var o13 = a[ 7 ];
            var o20 = a[ 8 ];
            var o21 = a[ 9 ];
            var o22 = a[ 10 ];
            var o23 = a[ 11 ];
            var o30 = a[ 12 ];
            var o31 = a[ 13 ];
            var o32 = a[ 14 ];
            var o33 = a[ 15 ];

            r[ 0 ] = s00 * o00 + s01 * o10 + s02 * o20 + s03 * o30;
            r[ 1 ] = s00 * o01 + s01 * o11 + s02 * o21 + s03 * o31;
            r[ 2 ] = s00 * o02 + s01 * o12 + s02 * o22 + s03 * o32;
            r[ 3 ] = s00 * o03 + s01 * o13 + s02 * o23 + s03 * o33;

            r[ 4 ] = s10 * o00 + s11 * o10 + s12 * o20 + s13 * o30;
            r[ 5 ] = s10 * o01 + s11 * o11 + s12 * o21 + s13 * o31;
            r[ 6 ] = s10 * o02 + s11 * o12 + s12 * o22 + s13 * o32;
            r[ 7 ] = s10 * o03 + s11 * o13 + s12 * o23 + s13 * o33;

            r[ 8 ] = s20 * o00 + s21 * o10 + s22 * o20 + s23 * o30;
            r[ 9 ] = s20 * o01 + s21 * o11 + s22 * o21 + s23 * o31;
            r[ 10 ] = s20 * o02 + s21 * o12 + s22 * o22 + s23 * o32;
            r[ 11 ] = s20 * o03 + s21 * o13 + s22 * o23 + s23 * o33;

            r[ 12 ] = s30 * o00 + s31 * o10 + s32 * o20 + s33 * o30;
            r[ 13 ] = s30 * o01 + s31 * o11 + s32 * o21 + s33 * o31;
            r[ 14 ] = s30 * o02 + s31 * o12 + s32 * o22 + s33 * o32;
            r[ 15 ] = s30 * o03 + s31 * o13 + s32 * o23 + s33 * o33;

            return r;
        },
        multOrig: function ( a, b, r ) {
            var t;
            if ( r === a ) {
                // pre mult
                t = [];
                for ( var col = 0; col < 4; col++ ) {
                    t[ 0 ] = Matrix.innerProduct( b, a, 0, col );
                    t[ 1 ] = Matrix.innerProduct( b, a, 1, col );
                    t[ 2 ] = Matrix.innerProduct( b, a, 2, col );
                    t[ 3 ] = Matrix.innerProduct( b, a, 3, col );
                    a[ 0 + col ] = t[ 0 ];
                    a[ 4 + col ] = t[ 1 ];
                    a[ 8 + col ] = t[ 2 ];
                    a[ 12 + col ] = t[ 3 ];
                }
                return a;
                //return this.preMult(r, b);
            } else if ( r === b ) {
                // post mult
                t = [];
                for ( var row = 0; row < 4; row++ ) {
                    t[ 0 ] = Matrix.innerProduct( b, a, row, 0 );
                    t[ 1 ] = Matrix.innerProduct( b, a, row, 1 );
                    t[ 2 ] = Matrix.innerProduct( b, a, row, 2 );
                    t[ 3 ] = Matrix.innerProduct( b, a, row, 3 );
                    this.setRow( b, row, t[ 0 ], t[ 1 ], t[ 2 ], t[ 3 ] );
                }
                return b;
                //return this.postMult(r, a);
            }
            if ( r === undefined ) {
                r = [];
            }

            var s00 = b[ 0 ];
            var s01 = b[ 1 ];
            var s02 = b[ 2 ];
            var s03 = b[ 3 ];
            var s10 = b[ 4 ];
            var s11 = b[ 5 ];
            var s12 = b[ 6 ];
            var s13 = b[ 7 ];
            var s20 = b[ 8 ];
            var s21 = b[ 9 ];
            var s22 = b[ 10 ];
            var s23 = b[ 11 ];
            var s30 = b[ 12 ];
            var s31 = b[ 13 ];
            var s32 = b[ 14 ];
            var s33 = b[ 15 ];

            var o00 = a[ 0 ];
            var o01 = a[ 1 ];
            var o02 = a[ 2 ];
            var o03 = a[ 3 ];
            var o10 = a[ 4 ];
            var o11 = a[ 5 ];
            var o12 = a[ 6 ];
            var o13 = a[ 7 ];
            var o20 = a[ 8 ];
            var o21 = a[ 9 ];
            var o22 = a[ 10 ];
            var o23 = a[ 11 ];
            var o30 = a[ 12 ];
            var o31 = a[ 13 ];
            var o32 = a[ 14 ];
            var o33 = a[ 15 ];

            r[ 0 ] = s00 * o00 + s01 * o10 + s02 * o20 + s03 * o30;
            r[ 1 ] = s00 * o01 + s01 * o11 + s02 * o21 + s03 * o31;
            r[ 2 ] = s00 * o02 + s01 * o12 + s02 * o22 + s03 * o32;
            r[ 3 ] = s00 * o03 + s01 * o13 + s02 * o23 + s03 * o33;

            r[ 4 ] = s10 * o00 + s11 * o10 + s12 * o20 + s13 * o30;
            r[ 5 ] = s10 * o01 + s11 * o11 + s12 * o21 + s13 * o31;
            r[ 6 ] = s10 * o02 + s11 * o12 + s12 * o22 + s13 * o32;
            r[ 7 ] = s10 * o03 + s11 * o13 + s12 * o23 + s13 * o33;

            r[ 8 ] = s20 * o00 + s21 * o10 + s22 * o20 + s23 * o30;
            r[ 9 ] = s20 * o01 + s21 * o11 + s22 * o21 + s23 * o31;
            r[ 10 ] = s20 * o02 + s21 * o12 + s22 * o22 + s23 * o32;
            r[ 11 ] = s20 * o03 + s21 * o13 + s22 * o23 + s23 * o33;

            r[ 12 ] = s30 * o00 + s31 * o10 + s32 * o20 + s33 * o30;
            r[ 13 ] = s30 * o01 + s31 * o11 + s32 * o21 + s33 * o31;
            r[ 14 ] = s30 * o02 + s31 * o12 + s32 * o22 + s33 * o32;
            r[ 15 ] = s30 * o03 + s31 * o13 + s32 * o23 + s33 * o33;

            return r;
        },

        makeLookAt: function ( eye, center, up, result ) {

            if ( result === undefined ) {
                result = [];
            }

            var f = Vec3.sub( center, eye, [] );
            Vec3.normalize( f, f );

            var s = Vec3.cross( f, up, [] );
            Vec3.normalize( s, s );

            var u = Vec3.cross( s, f, [] );
            Vec3.normalize( u, u );

            // s[0], u[0], -f[0], 0.0,
            // s[1], u[1], -f[1], 0.0,
            // s[2], u[2], -f[2], 0.0,
            // 0,    0,    0,     1.0

            result[ 0 ] = s[ 0 ];
            result[ 1 ] = u[ 0 ];
            result[ 2 ] = -f[ 0 ];
            result[ 3 ] = 0.0;
            result[ 4 ] = s[ 1 ];
            result[ 5 ] = u[ 1 ];
            result[ 6 ] = -f[ 1 ];
            result[ 7 ] = 0.0;
            result[ 8 ] = s[ 2 ];
            result[ 9 ] = u[ 2 ];
            result[ 10 ] = -f[ 2 ];
            result[ 11 ] = 0.0;
            result[ 12 ] = 0;
            result[ 13 ] = 0;
            result[ 14 ] = 0;
            result[ 15 ] = 1.0;

            Matrix.multTranslate( result, Vec3.neg( eye, [] ), result );
            return result;
        },
        makeOrtho: function ( left, right,
            bottom, top,
            zNear, zFar, result ) {
            if ( result === undefined ) {
                result = [];
            }
            // note transpose of Matrix_implementation wr.t OpenGL documentation, since the OSG use post multiplication rather than pre.
            // we will change this convention later
            var tx = -( right + left ) / ( right - left );
            var ty = -( top + bottom ) / ( top - bottom );
            var tz = -( zFar + zNear ) / ( zFar - zNear );
            var row = Matrix.setRow;
            row( result, 0, 2.0 / ( right - left ), 0.0, 0.0, 0.0 );
            row( result, 1, 0.0, 2.0 / ( top - bottom ), 0.0, 0.0 );
            row( result, 2, 0.0, 0.0, -2.0 / ( zFar - zNear ), 0.0 );
            row( result, 3, tx, ty, tz, 1.0 );
            return result;
        },

        getLookAt: function ( matrix, eye, center, up, distance ) {
            if ( distance === undefined ) {
                distance = 1.0;
            }
            var inv = [];
            var result = Matrix.inverse( matrix, inv );
            if ( !result ) {
                Matrix.makeIdentity( inv );
            }
            Matrix.transformVec3( inv, [ 0, 0, 0 ], eye );
            Matrix.transform3x3( matrix, [ 0, 1, 0 ], up );
            Matrix.transform3x3( matrix, [ 0, 0, -1 ], center );
            Vec3.normalize( center, center );
            Vec3.add( Vec3.mult( center, distance, [] ), eye, center );
        },

        //getRotate_David_Spillings_Mk1
        getRotate: function ( mat, quatResult ) {
            if ( quatResult === undefined ) {
                quatResult = [];
            }

            var s;
            var tq = [];
            var i, j;

            // Use tq to store the largest trace
            var mat00 = mat[ 4 * 0 + 0 ];
            var mat11 = mat[ 4 * 1 + 1 ];
            var mat22 = mat[ 4 * 2 + 2 ];
            tq[ 0 ] = 1 + mat00 + mat11 + mat22;
            tq[ 1 ] = 1 + mat00 - mat11 - mat22;
            tq[ 2 ] = 1 - mat00 + mat11 - mat22;
            tq[ 3 ] = 1 - mat00 - mat11 + mat22;

            // Find the maximum (could also use stacked if's later)
            j = 0;
            for ( i = 1; i < 4; i++ ) {
                if ( ( tq[ i ] > tq[ j ] ) ) {
                    j = i;
                } else {
                    j = j;
                }
            }

            // check the diagonal
            if ( j === 0 ) {
                /* perform instant calculation */
                quatResult[ 3 ] = tq[ 0 ];
                quatResult[ 0 ] = mat[ 1 * 4 + 2 ] - mat[ 2 * 4 + 1 ];
                quatResult[ 1 ] = mat[ 2 * 4 + 0 ] - mat[ 0 + 2 ];
                quatResult[ 2 ] = mat[ 0 + 1 ] - mat[ 1 * 4 + 0 ];
            } else if ( j == 1 ) {
                quatResult[ 3 ] = mat[ 1 * 4 + 2 ] - mat[ 2 * 4 + 1 ];
                quatResult[ 0 ] = tq[ 1 ];
                quatResult[ 1 ] = mat[ 0 + 1 ] + mat[ 1 * 4 + 0 ];
                quatResult[ 2 ] = mat[ 2 * 4 + 0 ] + mat[ 0 + 2 ];
            } else if ( j == 2 ) {
                quatResult[ 3 ] = mat[ 2 * 4 + 0 ] - mat[ 0 + 2 ];
                quatResult[ 0 ] = mat[ 0 + 1 ] + mat[ 1 * 4 + 0 ];
                quatResult[ 1 ] = tq[ 2 ];
                quatResult[ 2 ] = mat[ 1 * 4 + 2 ] + mat[ 2 * 4 + 1 ];
            } else /* if (j==3) */ {
                quatResult[ 3 ] = mat[ 0 + 1 ] - mat[ 1 * 4 + 0 ];
                quatResult[ 0 ] = mat[ 2 * 4 + 0 ] + mat[ 0 + 2 ];
                quatResult[ 1 ] = mat[ 1 * 4 + 2 ] + mat[ 2 * 4 + 1 ];
                quatResult[ 2 ] = tq[ 3 ];
            }

            s = Math.sqrt( 0.25 / tq[ j ] );
            quatResult[ 3 ] *= s;
            quatResult[ 0 ] *= s;
            quatResult[ 1 ] *= s;
            quatResult[ 2 ] *= s;

            return quatResult;
        },

        // Matrix M = Matrix M * Matrix Translate
        preMultTranslate: function ( mat, translate ) {
            if ( translate[ 0 ] !== 0.0 ) {
                val = translate[ 0 ];
                mat[ 12 ] += val * mat[ 0 ];
                mat[ 13 ] += val * mat[ 1 ];
                mat[ 14 ] += val * mat[ 2 ];
                mat[ 15 ] += val * mat[ 3 ];
            }

            if ( translate[ 1 ] !== 0.0 ) {
                val = translate[ 1 ];
                mat[ 12 ] += val * mat[ 4 ];
                mat[ 13 ] += val * mat[ 5 ];
                mat[ 14 ] += val * mat[ 6 ];
                mat[ 15 ] += val * mat[ 7 ];
            }

            if ( translate[ 2 ] !== 0.0 ) {
                val = translate[ 2 ];
                mat[ 12 ] += val * mat[ 8 ];
                mat[ 13 ] += val * mat[ 9 ];
                mat[ 14 ] += val * mat[ 10 ];
                mat[ 15 ] += val * mat[ 11 ];
            }
            return mat;
        },


        // result = Matrix M * Matrix Translate
        multTranslate: function ( mat, translate, result ) {
            if ( result === undefined ) {
                result = [];
            }
            if ( result !== mat ) {
                Matrix.copy( mat, result );
            }

            var val;
            if ( translate[ 0 ] !== 0.0 ) {
                val = translate[ 0 ];
                result[ 12 ] += val * mat[ 0 ];
                result[ 13 ] += val * mat[ 1 ];
                result[ 14 ] += val * mat[ 2 ];
                result[ 15 ] += val * mat[ 3 ];
            }

            if ( translate[ 1 ] !== 0.0 ) {
                val = translate[ 1 ];
                result[ 12 ] += val * mat[ 4 ];
                result[ 13 ] += val * mat[ 5 ];
                result[ 14 ] += val * mat[ 6 ];
                result[ 15 ] += val * mat[ 7 ];
            }

            if ( translate[ 2 ] !== 0.0 ) {
                val = translate[ 2 ];
                result[ 12 ] += val * mat[ 8 ];
                result[ 13 ] += val * mat[ 9 ];
                result[ 14 ] += val * mat[ 10 ];
                result[ 15 ] += val * mat[ 11 ];
            }
            return result;
        },

        makeRotate: function ( angle, x, y, z, result ) {
            if ( result === undefined ) {
                Notify.log( 'makeRotate without given matrix destination is deprecated' );
                result = [];
            }

            var mag = Math.sqrt( x * x + y * y + z * z );
            var sinAngle = Math.sin( angle );
            var cosAngle = Math.cos( angle );

            if ( mag > 0.0 ) {
                var xx, yy, zz, xy, yz, zx, xs, ys, zs;
                var oneMinusCos;
                var rotMat;
                mag = 1.0 / mag;

                x *= mag;
                y *= mag;
                z *= mag;

                xx = x * x;
                yy = y * y;
                zz = z * z;
                xy = x * y;
                yz = y * z;
                zx = z * x;
                xs = x * sinAngle;
                ys = y * sinAngle;
                zs = z * sinAngle;
                oneMinusCos = 1.0 - cosAngle;

                result[ 0 ] = ( oneMinusCos * xx ) + cosAngle;
                result[ 1 ] = ( oneMinusCos * xy ) - zs;
                result[ 2 ] = ( oneMinusCos * zx ) + ys;
                result[ 3 ] = 0.0;

                result[ 4 ] = ( oneMinusCos * xy ) + zs;
                result[ 5 ] = ( oneMinusCos * yy ) + cosAngle;
                result[ 6 ] = ( oneMinusCos * yz ) - xs;
                result[ 7 ] = 0.0;

                result[ 8 ] = ( oneMinusCos * zx ) - ys;
                result[ 9 ] = ( oneMinusCos * yz ) + xs;
                result[ 10 ] = ( oneMinusCos * zz ) + cosAngle;
                result[ 11 ] = 0.0;

                result[ 12 ] = 0.0;
                result[ 13 ] = 0.0;
                result[ 14 ] = 0.0;
                result[ 15 ] = 1.0;

                return result;
            } else {
                return Matrix.makeIdentity( result );
            }

            return result;
        },

        transform3x3: function ( m, v, result ) {
            if ( result === undefined ) {
                result = [];
            }
            result[ 0 ] = m[ 0 ] * v[ 0 ] + m[ 1 ] * v[ 1 ] + m[ 2 ] * v[ 2 ];
            result[ 1 ] = m[ 4 ] * v[ 0 ] + m[ 5 ] * v[ 1 ] + m[ 6 ] * v[ 2 ];
            result[ 2 ] = m[ 8 ] * v[ 0 ] + m[ 9 ] * v[ 1 ] + m[ 10 ] * v[ 2 ];
            return result;
        },

        transformVec3: function ( matrix, vector, result ) {
            var d = 1.0 / ( matrix[ 3 ] * vector[ 0 ] + matrix[ 7 ] * vector[ 1 ] + matrix[ 11 ] * vector[ 2 ] + matrix[ 15 ] );

            if ( result === undefined ) {
                Notify.warn( 'deprecated, Matrix.transformVec3 needs a third parameter as result' );
                result = [];
            }

            var tmp;
            if ( result === vector ) {
                tmp = [];
            } else {
                tmp = result;
            }
            tmp[ 0 ] = ( matrix[ 0 ] * vector[ 0 ] + matrix[ 4 ] * vector[ 1 ] + matrix[ 8 ] * vector[ 2 ] + matrix[ 12 ] ) * d;
            tmp[ 1 ] = ( matrix[ 1 ] * vector[ 0 ] + matrix[ 5 ] * vector[ 1 ] + matrix[ 9 ] * vector[ 2 ] + matrix[ 13 ] ) * d;
            tmp[ 2 ] = ( matrix[ 2 ] * vector[ 0 ] + matrix[ 6 ] * vector[ 1 ] + matrix[ 10 ] * vector[ 2 ] + matrix[ 14 ] ) * d;

            if ( result === vector ) {
                Vec3.copy( tmp, result );
            }
            return result;
        },

        transformVec4: function ( matrix, vector, result ) {
            if ( result === undefined ) {
                result = [];
            }
            var tmp;
            if ( result === vector ) {
                tmp = [];
            } else {
                tmp = result;
            }
            tmp[ 0 ] = ( matrix[ 0 ] * vector[ 0 ] + matrix[ 1 ] * vector[ 1 ] + matrix[ 2 ] * vector[ 2 ] + matrix[ 3 ] * vector[ 3 ] );
            tmp[ 1 ] = ( matrix[ 4 ] * vector[ 0 ] + matrix[ 5 ] * vector[ 1 ] + matrix[ 6 ] * vector[ 2 ] + matrix[ 7 ] * vector[ 3 ] );
            tmp[ 2 ] = ( matrix[ 8 ] * vector[ 0 ] + matrix[ 9 ] * vector[ 1 ] + matrix[ 10 ] * vector[ 2 ] + matrix[ 11 ] * vector[ 3 ] );
            tmp[ 3 ] = ( matrix[ 12 ] * vector[ 0 ] + matrix[ 13 ] * vector[ 1 ] + matrix[ 14 ] * vector[ 2 ] + matrix[ 15 ] * vector[ 3 ] );

            if ( result === vector ) {
                Vec4.copy( tmp, result );
            }
            return result;
        },

        copy: function ( matrix, result ) {
            if ( result === undefined ) {
                result = [];
            }
            result[ 0 ] = matrix[ 0 ];
            result[ 1 ] = matrix[ 1 ];
            result[ 2 ] = matrix[ 2 ];
            result[ 3 ] = matrix[ 3 ];
            result[ 4 ] = matrix[ 4 ];
            result[ 5 ] = matrix[ 5 ];
            result[ 6 ] = matrix[ 6 ];
            result[ 7 ] = matrix[ 7 ];
            result[ 8 ] = matrix[ 8 ];
            result[ 9 ] = matrix[ 9 ];
            result[ 10 ] = matrix[ 10 ];
            result[ 11 ] = matrix[ 11 ];
            result[ 12 ] = matrix[ 12 ];
            result[ 13 ] = matrix[ 13 ];
            result[ 14 ] = matrix[ 14 ];
            result[ 15 ] = matrix[ 15 ];
            return result;
        },

        inverse: function ( matrix, result ) {
            if ( result === matrix ) {
                Matrix.copy( matrix, Matrix._tmp1 );
                matrix = Matrix._tmp1;
            }

            if ( matrix[ 3 ] === 0.0 && matrix[ 7 ] === 0.0 && matrix[ 11 ] === 0.0 && matrix[ 15 ] === 1.0 ) {
                return this.inverse4x3( matrix, result );
            } else {
                return this.inverse4x4( matrix, result );
            }
        },

        /**
         *  if a result argument is given the return of the function is true or false
         *  depending if the matrix can be inverted, else if no result argument is given
         *  the return is identity if the matrix can not be inverted and the matrix overthise
         */
        inverse4x4: function ( matrix, result ) {
            var tmp_0 = matrix[ 10 ] * matrix[ 15 ];
            var tmp_1 = matrix[ 14 ] * matrix[ 11 ];
            var tmp_2 = matrix[ 6 ] * matrix[ 15 ];
            var tmp_3 = matrix[ 14 ] * matrix[ 7 ];
            var tmp_4 = matrix[ 6 ] * matrix[ 11 ];
            var tmp_5 = matrix[ 10 ] * matrix[ 7 ];
            var tmp_6 = matrix[ 2 ] * matrix[ 15 ];
            var tmp_7 = matrix[ 14 ] * matrix[ 3 ];
            var tmp_8 = matrix[ 2 ] * matrix[ 11 ];
            var tmp_9 = matrix[ 10 ] * matrix[ 3 ];
            var tmp_10 = matrix[ 2 ] * matrix[ 7 ];
            var tmp_11 = matrix[ 6 ] * matrix[ 3 ];
            var tmp_12 = matrix[ 8 ] * matrix[ 13 ];
            var tmp_13 = matrix[ 12 ] * matrix[ 9 ];
            var tmp_14 = matrix[ 4 ] * matrix[ 13 ];
            var tmp_15 = matrix[ 12 ] * matrix[ 5 ];
            var tmp_16 = matrix[ 4 ] * matrix[ 9 ];
            var tmp_17 = matrix[ 8 ] * matrix[ 5 ];
            var tmp_18 = matrix[ 0 ] * matrix[ 13 ];
            var tmp_19 = matrix[ 12 ] * matrix[ 1 ];
            var tmp_20 = matrix[ 0 ] * matrix[ 9 ];
            var tmp_21 = matrix[ 8 ] * matrix[ 1 ];
            var tmp_22 = matrix[ 0 ] * matrix[ 5 ];
            var tmp_23 = matrix[ 4 ] * matrix[ 1 ];

            var t0 = ( ( tmp_0 * matrix[ 5 ] + tmp_3 * matrix[ 9 ] + tmp_4 * matrix[ 13 ] ) -
                ( tmp_1 * matrix[ 5 ] + tmp_2 * matrix[ 9 ] + tmp_5 * matrix[ 13 ] ) );
            var t1 = ( ( tmp_1 * matrix[ 1 ] + tmp_6 * matrix[ 9 ] + tmp_9 * matrix[ 13 ] ) -
                ( tmp_0 * matrix[ 1 ] + tmp_7 * matrix[ 9 ] + tmp_8 * matrix[ 13 ] ) );
            var t2 = ( ( tmp_2 * matrix[ 1 ] + tmp_7 * matrix[ 5 ] + tmp_10 * matrix[ 13 ] ) -
                ( tmp_3 * matrix[ 1 ] + tmp_6 * matrix[ 5 ] + tmp_11 * matrix[ 13 ] ) );
            var t3 = ( ( tmp_5 * matrix[ 1 ] + tmp_8 * matrix[ 5 ] + tmp_11 * matrix[ 9 ] ) -
                ( tmp_4 * matrix[ 1 ] + tmp_9 * matrix[ 5 ] + tmp_10 * matrix[ 9 ] ) );

            var d1 = ( matrix[ 0 ] * t0 + matrix[ 4 ] * t1 + matrix[ 8 ] * t2 + matrix[ 12 ] * t3 );
            if ( Math.abs( d1 ) < 1e-5 ) {
                Notify.log( 'Warning can\'t inverse matrix ' + matrix );
                return false;
            }
            var d = 1.0 / d1;

            var out_00 = d * t0;
            var out_01 = d * t1;
            var out_02 = d * t2;
            var out_03 = d * t3;

            var out_10 = d * ( ( tmp_1 * matrix[ 4 ] + tmp_2 * matrix[ 8 ] + tmp_5 * matrix[ 12 ] ) -
                ( tmp_0 * matrix[ 4 ] + tmp_3 * matrix[ 8 ] + tmp_4 * matrix[ 12 ] ) );
            var out_11 = d * ( ( tmp_0 * matrix[ 0 ] + tmp_7 * matrix[ 8 ] + tmp_8 * matrix[ 12 ] ) -
                ( tmp_1 * matrix[ 0 ] + tmp_6 * matrix[ 8 ] + tmp_9 * matrix[ 12 ] ) );
            var out_12 = d * ( ( tmp_3 * matrix[ 0 ] + tmp_6 * matrix[ 4 ] + tmp_11 * matrix[ 12 ] ) -
                ( tmp_2 * matrix[ 0 ] + tmp_7 * matrix[ 4 ] + tmp_10 * matrix[ 12 ] ) );
            var out_13 = d * ( ( tmp_4 * matrix[ 0 ] + tmp_9 * matrix[ 4 ] + tmp_10 * matrix[ 8 ] ) -
                ( tmp_5 * matrix[ 0 ] + tmp_8 * matrix[ 4 ] + tmp_11 * matrix[ 8 ] ) );

            var out_20 = d * ( ( tmp_12 * matrix[ 7 ] + tmp_15 * matrix[ 11 ] + tmp_16 * matrix[ 15 ] ) -
                ( tmp_13 * matrix[ 7 ] + tmp_14 * matrix[ 11 ] + tmp_17 * matrix[ 15 ] ) );
            var out_21 = d * ( ( tmp_13 * matrix[ 3 ] + tmp_18 * matrix[ 11 ] + tmp_21 * matrix[ 15 ] ) -
                ( tmp_12 * matrix[ 3 ] + tmp_19 * matrix[ 11 ] + tmp_20 * matrix[ 15 ] ) );
            var out_22 = d * ( ( tmp_14 * matrix[ 3 ] + tmp_19 * matrix[ 7 ] + tmp_22 * matrix[ 15 ] ) -
                ( tmp_15 * matrix[ 3 ] + tmp_18 * matrix[ 7 ] + tmp_23 * matrix[ 15 ] ) );
            var out_23 = d * ( ( tmp_17 * matrix[ 3 ] + tmp_20 * matrix[ 7 ] + tmp_23 * matrix[ 11 ] ) -
                ( tmp_16 * matrix[ 3 ] + tmp_21 * matrix[ 7 ] + tmp_22 * matrix[ 11 ] ) );

            var out_30 = d * ( ( tmp_14 * matrix[ 10 ] + tmp_17 * matrix[ 14 ] + tmp_13 * matrix[ 6 ] ) -
                ( tmp_16 * matrix[ 14 ] + tmp_12 * matrix[ 6 ] + tmp_15 * matrix[ 10 ] ) );
            var out_31 = d * ( ( tmp_20 * matrix[ 14 ] + tmp_12 * matrix[ 2 ] + tmp_19 * matrix[ 10 ] ) -
                ( tmp_18 * matrix[ 10 ] + tmp_21 * matrix[ 14 ] + tmp_13 * matrix[ 2 ] ) );
            var out_32 = d * ( ( tmp_18 * matrix[ 6 ] + tmp_23 * matrix[ 14 ] + tmp_15 * matrix[ 2 ] ) -
                ( tmp_22 * matrix[ 14 ] + tmp_14 * matrix[ 2 ] + tmp_19 * matrix[ 6 ] ) );
            var out_33 = d * ( ( tmp_22 * matrix[ 10 ] + tmp_16 * matrix[ 2 ] + tmp_21 * matrix[ 6 ] ) -
                ( tmp_20 * matrix[ 6 ] + tmp_23 * matrix[ 10 ] + tmp_17 * matrix[ 2 ] ) );

            result[ 0 ] = out_00;
            result[ 1 ] = out_01;
            result[ 2 ] = out_02;
            result[ 3 ] = out_03;
            result[ 4 ] = out_10;
            result[ 5 ] = out_11;
            result[ 6 ] = out_12;
            result[ 7 ] = out_13;
            result[ 8 ] = out_20;
            result[ 9 ] = out_21;
            result[ 10 ] = out_22;
            result[ 11 ] = out_23;
            result[ 12 ] = out_30;
            result[ 13 ] = out_31;
            result[ 14 ] = out_32;
            result[ 15 ] = out_33;

            return true;
        },

        // comes from OpenSceneGraph
        /*
      Matrix inversion technique:
      Given a matrix mat, we want to invert it.
      mat = [ r00 r01 r02 a
              r10 r11 r12 b
              r20 r21 r22 c
              tx  ty  tz  d ]
      We note that this matrix can be split into three matrices.
      mat = rot * trans * corr, where rot is rotation part, trans is translation part, and corr is the correction due to perspective (if any).
      rot = [ r00 r01 r02 0
              r10 r11 r12 0
              r20 r21 r22 0
              0   0   0   1 ]
      trans = [ 1  0  0  0
                0  1  0  0
                0  0  1  0
                tx ty tz 1 ]
      corr = [ 1 0 0 px
               0 1 0 py
               0 0 1 pz
               0 0 0 s ]

      where the elements of corr are obtained from linear combinations of the elements of rot, trans, and mat.
      So the inverse is mat' = (trans * corr)' * rot', where rot' must be computed the traditional way, which is easy since it is only a 3x3 matrix.
      This problem is simplified if [px py pz s] = [0 0 0 1], which will happen if mat was composed only of rotations, scales, and translations (which is common).  In this case, we can ignore corr entirely which saves on a lot of computations.
    */

        inverse4x3: function ( matrix, result ) {

            // Copy rotation components
            var r00 = matrix[ 0 ];
            var r01 = matrix[ 1 ];
            var r02 = matrix[ 2 ];

            var r10 = matrix[ 4 ];
            var r11 = matrix[ 5 ];
            var r12 = matrix[ 6 ];

            var r20 = matrix[ 8 ];
            var r21 = matrix[ 9 ];
            var r22 = matrix[ 10 ];

            // Partially compute inverse of rot
            result[ 0 ] = r11 * r22 - r12 * r21;
            result[ 1 ] = r02 * r21 - r01 * r22;
            result[ 2 ] = r01 * r12 - r02 * r11;

            // Compute determinant of rot from 3 elements just computed
            var one_over_det = 1.0 / ( r00 * result[ 0 ] + r10 * result[ 1 ] + r20 * result[ 2 ] );
            r00 *= one_over_det;
            r10 *= one_over_det;
            r20 *= one_over_det; // Saves on later computations

            // Finish computing inverse of rot
            result[ 0 ] *= one_over_det;
            result[ 1 ] *= one_over_det;
            result[ 2 ] *= one_over_det;
            result[ 3 ] = 0.0;
            result[ 4 ] = r12 * r20 - r10 * r22; // Have already been divided by det
            result[ 5 ] = r00 * r22 - r02 * r20; // same
            result[ 6 ] = r02 * r10 - r00 * r12; // same
            result[ 7 ] = 0.0;
            result[ 8 ] = r10 * r21 - r11 * r20; // Have already been divided by det
            result[ 9 ] = r01 * r20 - r00 * r21; // same
            result[ 10 ] = r00 * r11 - r01 * r10; // same
            result[ 11 ] = 0.0;
            result[ 15 ] = 1.0;

            var tx, ty, tz;

            var d = matrix[ 15 ];
            var dm = d - 1.0;
            if ( dm * dm > 1.0e-6 ) // Involves perspective, so we must
            { // compute the full inverse

                var inv = Matrix._tmp0;
                result[ 12 ] = result[ 13 ] = result[ 14 ] = 0.0;

                var a = matrix[ 3 ];
                var b = matrix[ 7 ];
                var c = matrix[ 11 ];
                var px = result[ 0 ] * a + result[ 1 ] * b + result[ 2 ] * c;
                var py = result[ 4 ] * a + result[ 5 ] * b + result[ 6 ] * c;
                var pz = result[ 8 ] * a + result[ 9 ] * b + result[ 10 ] * c;

                tx = matrix[ 12 ];
                ty = matrix[ 13 ];
                tz = matrix[ 14 ];
                var one_over_s = 1.0 / ( d - ( tx * px + ty * py + tz * pz ) );

                tx *= one_over_s;
                ty *= one_over_s;
                tz *= one_over_s; // Reduces number of calculations later on

                // Compute inverse of trans*corr
                inv[ 0 ] = tx * px + 1.0;
                inv[ 1 ] = ty * px;
                inv[ 2 ] = tz * px;
                inv[ 3 ] = -px * one_over_s;
                inv[ 4 ] = tx * py;
                inv[ 5 ] = ty * py + 1.0;
                inv[ 6 ] = tz * py;
                inv[ 7 ] = -py * one_over_s;
                inv[ 8 ] = tx * pz;
                inv[ 9 ] = ty * pz;
                inv[ 10 ] = tz * pz + 1.0;
                inv[ 11 ] = -pz * one_over_s;
                inv[ 12 ] = -tx;
                inv[ 13 ] = -ty;
                inv[ 14 ] = -tz;
                inv[ 15 ] = one_over_s;

                Matrix.preMult( result, inv ); // Finish computing full inverse of mat
            } else {

                tx = matrix[ 12 ];
                ty = matrix[ 13 ];
                tz = matrix[ 14 ];

                // Compute translation components of mat'
                result[ 12 ] = -( tx * result[ 0 ] + ty * result[ 4 ] + tz * result[ 8 ] );
                result[ 13 ] = -( tx * result[ 1 ] + ty * result[ 5 ] + tz * result[ 9 ] );
                result[ 14 ] = -( tx * result[ 2 ] + ty * result[ 6 ] + tz * result[ 10 ] );
            }
            return true;

        },

        transpose: function ( mat, dest ) {
            // from glMatrix
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if ( mat === dest ) {
                var a01 = mat[ 1 ],
                    a02 = mat[ 2 ],
                    a03 = mat[ 3 ];
                var a12 = mat[ 6 ],
                    a13 = mat[ 7 ];
                var a23 = mat[ 11 ];

                mat[ 1 ] = mat[ 4 ];
                mat[ 2 ] = mat[ 8 ];
                mat[ 3 ] = mat[ 12 ];
                mat[ 4 ] = a01;
                mat[ 6 ] = mat[ 9 ];
                mat[ 7 ] = mat[ 13 ];
                mat[ 8 ] = a02;
                mat[ 9 ] = a12;
                mat[ 11 ] = mat[ 14 ];
                mat[ 12 ] = a03;
                mat[ 13 ] = a13;
                mat[ 14 ] = a23;
                return mat;
            } else {
                dest[ 0 ] = mat[ 0 ];
                dest[ 1 ] = mat[ 4 ];
                dest[ 2 ] = mat[ 8 ];
                dest[ 3 ] = mat[ 12 ];
                dest[ 4 ] = mat[ 1 ];
                dest[ 5 ] = mat[ 5 ];
                dest[ 6 ] = mat[ 9 ];
                dest[ 7 ] = mat[ 13 ];
                dest[ 8 ] = mat[ 2 ];
                dest[ 9 ] = mat[ 6 ];
                dest[ 10 ] = mat[ 10 ];
                dest[ 11 ] = mat[ 14 ];
                dest[ 12 ] = mat[ 3 ];
                dest[ 13 ] = mat[ 7 ];
                dest[ 14 ] = mat[ 11 ];
                dest[ 15 ] = mat[ 15 ];
                return dest;
            }
        },

        makePerspective: function ( fovy, aspect, znear, zfar, result ) {
            if ( result === undefined ) {
                result = [];
            }
            var ymax = znear * Math.tan( fovy * Math.PI / 360.0 );
            var ymin = -ymax;
            var xmin = ymin * aspect;
            var xmax = ymax * aspect;

            return Matrix.makeFrustum( xmin, xmax, ymin, ymax, znear, zfar, result );
        },

        getFrustum: function ( matrix, result ) {
            var right = 0.0;
            var left = 0.0;
            var top = 0.0;
            var bottom = 0.0;

            if ( matrix[ 0 * 4 + 3 ] !== 0.0 || matrix[ 1 * 4 + 3 ] !== 0.0 || matrix[ 2 * 4 + 3 ] !== -1.0 || matrix[ 3 * 4 + 3 ] !== 0.0 ) {
                return false;
            }

            // note: near and far must be used inside this method instead of zNear and zFar
            // because zNear and zFar are references and they may point to the same variable.
            var temp_near = matrix[ 3 * 4 + 2 ] / ( matrix[ 2 * 4 + 2 ] - 1.0 );
            var temp_far = matrix[ 3 * 4 + 2 ] / ( 1.0 + matrix[ 2 * 4 + 2 ] );

            left = temp_near * ( matrix[ 2 * 4 ] - 1.0 ) / matrix[ 0 ];
            right = temp_near * ( 1.0 + matrix[ 2 * 4 ] ) / matrix[ 0 ];

            top = temp_near * ( 1.0 + matrix[ 2 * 4 + 1 ] ) / matrix[ 1 * 4 + 1 ];
            bottom = temp_near * ( matrix[ 2 * 4 + 1 ] - 1.0 ) / matrix[ 1 * 4 + 1 ];

            zNear = temp_near;
            zFar = temp_far;

            result.left = left;
            result.right = right;
            result.top = top;
            result.bottom = bottom;
            result.zNear = zNear;
            result.zFar = zFar;

            return true;
        },

        getPerspective: function ( matrix, result ) {
            var c = {
                'right': 0,
                'left': 0,
                'top': 0,
                'bottom': 0,
                'zNear': 0,
                'zFar': 0
            };
            // get frustum and compute results
            var r = this.getFrustum( matrix, c );
            if ( r ) {
                result.fovy = 180 / Math.PI * ( Math.atan( c.top / c.zNear ) - Math.atan( c.bottom / c.zNear ) );
                result.aspectRatio = ( c.right - c.left ) / ( c.top - c.bottom );
            }
            result.zNear = c.zNear;
            result.zFar = c.zFar;
            return result;
        },

        makeScale: function ( x, y, z, result ) {
            if ( result === undefined ) {
                result = [];
            }
            this.setRow( result, 0, x, 0, 0, 0 );
            this.setRow( result, 1, 0, y, 0, 0 );
            this.setRow( result, 2, 0, 0, z, 0 );
            this.setRow( result, 3, 0, 0, 0, 1 );
            return result;
        },

        // compute the 4 corners vector of the frustrum
        computeFrustrumCornersVectors: function ( projectionMatrix, vectorsArray ) {
            var znear = projectionMatrix[ 12 + 2 ] / ( projectionMatrix[ 8 + 2 ] - 1.0 );
            var zfar = projectionMatrix[ 12 + 2 ] / ( projectionMatrix[ 8 + 2 ] + 1.0 );
            var x = 1.0 / projectionMatrix[ 0 ];
            var y = 1.0 / projectionMatrix[ 1 * 4 + 1 ];

            vectorsArray[ 0 ] = [ -x, y, 1.0 ];
            vectorsArray[ 1 ] = [ -x, -y, 1.0 ];
            vectorsArray[ 2 ] = [ x, -y, 1.0 ];
            vectorsArray[ 3 ] = [ x, y, 1.0 ];
            return vectorsArray;
        },

        makeFrustum: function ( left, right,
            bottom, top,
            znear, zfar, result ) {
            if ( result === undefined ) {
                result = [];
            }
            var X = 2 * znear / ( right - left );
            var Y = 2 * znear / ( top - bottom );
            var A = ( right + left ) / ( right - left );
            var B = ( top + bottom ) / ( top - bottom );
            var C = -( zfar + znear ) / ( zfar - znear );
            var D = -2 * zfar * znear / ( zfar - znear );
            this.setRow( result, 0, X, 0, 0, 0 );
            this.setRow( result, 1, 0, Y, 0, 0 );
            this.setRow( result, 2, A, B, C, -1 );
            this.setRow( result, 3, 0, 0, D, 0 );
            return result;
        },

        makeRotateFromQuat: function ( quat, result ) {
            this.makeIdentity( result );
            return this.setRotateFromQuat( result, quat );
        },

        setRotateFromQuat: function ( matrix, quat ) {
            var length2 = Quat.length2( quat );
            if ( Math.abs( length2 ) <= Number.MIN_VALUE ) {
                matrix[ 0 ] = 0.0;
                matrix[ 1 ] = 0.0;
                matrix[ 2 ] = 0.0;

                matrix[ 4 ] = 0.0;
                matrix[ 5 ] = 0.0;
                matrix[ 6 ] = 0.0;

                matrix[ 8 ] = 0.0;
                matrix[ 9 ] = 0.0;
                matrix[ 10 ] = 0.0;
            } else {
                var rlength2;
                // normalize quat if required.
                // We can avoid the expensive sqrt in this case since all 'coefficients' below are products of two q components.
                // That is a square of a square root, so it is possible to avoid that
                if ( length2 !== 1.0 ) {
                    rlength2 = 2.0 / length2;
                } else {
                    rlength2 = 2.0;
                }

                // Source: Gamasutra, Rotating Objects Using Quaternions
                //
                //http://www.gamasutra.com/features/19980703/quaternions_01.htm

                var wx, wy, wz, xx, yy, yz, xy, xz, zz, x2, y2, z2;

                // calculate coefficients
                x2 = rlength2 * quat[ 0 ];
                y2 = rlength2 * quat[ 1 ];
                z2 = rlength2 * quat[ 2 ];

                xx = quat[ 0 ] * x2;
                xy = quat[ 0 ] * y2;
                xz = quat[ 0 ] * z2;

                yy = quat[ 1 ] * y2;
                yz = quat[ 1 ] * z2;
                zz = quat[ 2 ] * z2;

                wx = quat[ 3 ] * x2;
                wy = quat[ 3 ] * y2;
                wz = quat[ 3 ] * z2;

                // Note.  Gamasutra gets the matrix assignments inverted, resulting
                // in left-handed rotations, which is contrary to OpenGL and OSG's
                // methodology.  The matrix assignment has been altered in the next
                // few lines of code to do the right thing.
                // Don Burns - Oct 13, 2001
                matrix[ 0 ] = 1.0 - ( yy + zz );
                matrix[ 4 ] = xy - wz;
                matrix[ 8 ] = xz + wy;


                matrix[ 0 + 1 ] = xy + wz;
                matrix[ 4 + 1 ] = 1.0 - ( xx + zz );
                matrix[ 8 + 1 ] = yz - wx;

                matrix[ 0 + 2 ] = xz - wy;
                matrix[ 4 + 2 ] = yz + wx;
                matrix[ 8 + 2 ] = 1.0 - ( xx + yy );
            }
            return matrix;
        }
    };

    return Matrix;
} );
/*global define */

define( [
    'osg/Notify'
], function ( Notify ) {

    /** 
     * Shader manage shader for vertex and fragment, you need both to create a glsl program.
     * @class Shader
     */
    var Shader = function ( type, text ) {

        var t = type;
        if ( typeof ( type ) === 'string' ) {
            t = Shader[ type ];
        }
        this.type = t;
        this.setText( text );
    };

    Shader.VERTEX_SHADER = 0x8B31;
    Shader.FRAGMENT_SHADER = 0x8B30;

    /** @lends Shader.prototype */
    Shader.prototype = {
        setText: function ( text ) {
            this.text = text;
        },
        getText: function () {
            return this.text;
        },
        compile: function () {
            this.shader = gl.createShader( this.type );
            gl.shaderSource( this.shader, this.text );
            gl.compileShader( this.shader );
            if ( !gl.getShaderParameter( this.shader, gl.COMPILE_STATUS ) && !gl.isContextLost() ) {
                Notify.log( 'can\'t compile shader:\n' + this.text + '\n' );
                var tmpText = '\n' + this.text;
                var splittedText = tmpText.split( '\n' );
                var newText = '\n';
                for ( var i = 0, l = splittedText.length; i < l; ++i ) {
                    newText += i + ' ' + splittedText[ i ] + '\n';
                }
                Notify.log( newText );
                Notify.log( gl.getShaderInfoLog( this.shader ) );
            }
        }
    };

    Shader.create = function ( type, text ) {
        Notify.log( 'Shader.create is deprecated, use new Shader with the same arguments instead' );
        return new Shader( type, text );
    };

    return Shader;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Object'
], function ( MACROUTILS, Object ) {

    /**
     * StateAttribute base class
     * @class StateAttribute
     */
    var StateAttribute = function () {
        Object.call( this );
        this._dirty = true;
    };

    /** @lends StateAttribute.prototype */
    StateAttribute.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInherit( Object.prototype, {
        isDirty: function () {
            return this._dirty;
        },
        dirty: function () {
            this._dirty = true;
        },
        setDirty: function ( dirty ) {
            this._dirty = dirty;
        }
    } ), 'osg', 'StateAttribute' );

    StateAttribute.OFF = 0;
    StateAttribute.ON = 1;
    StateAttribute.OVERRIDE = 2;
    StateAttribute.PROTECTED = 4;
    StateAttribute.INHERIT = 8;

    return StateAttribute;
} );
/*global define */

define( [
    'osg/Utils'
], function ( MACROUTILS ) {
    /** -*- compile-command: 'jslint-cli Uniform.js' -*- */

    /** 
     * Uniform manage variable used in glsl shader.
     * @class Uniform
     */
    var Uniform = function () {
        this.transpose = false;
        this._dirty = true;
        this.name = '';
        this.type = undefined;
    };

    Uniform.isUniform = function ( obj ) {
        if ( obj.prototype === Uniform.prototype ) {
            return true;
        }
        return false;
    };

    /** @lends Uniform.prototype */
    Uniform.prototype = {
        getName: function () {
            return this.name;
        },
        getType: function () {
            return this.type;
        },

        get: function () { // call dirty if you update this array outside
            return this.data;
        },
        set: function ( array ) {
            this.data = array;
            this.dirty();
        },
        dirty: function () {
            this._dirty = true;
        },
        apply: function ( location ) {
            if ( this._dirty ) {
                this.update.call( this.glData, this.data );
                this._dirty = false;
            }
            this.glCall( location, this.glData );
        },
        applyMatrix: function ( location ) {
            if ( this._dirty ) {
                this.update.call( this.glData, this.data );
                this._dirty = false;
            }
            this.glCall( location, this.transpose, this.glData );
        },
        update: function ( array ) {
            for ( var i = 0, l = array.length; i < l; ++i ) { // FF not traced maybe short
                this[ i ] = array[ i ];
            }
        },

        _updateArray: function ( array ) {
            for ( var i = 0, l = array.length; i < l; ++i ) { // FF not traced maybe short
                this[ i ] = array[ i ];
            }
        },

        _updateFloat1: function ( f ) {
            this[ 0 ] = f[ 0 ];
        },
        _updateFloat2: function ( f ) {
            this[ 0 ] = f[ 0 ];
            this[ 1 ] = f[ 1 ];
        },
        _updateFloat3: function ( f ) {
            this[ 0 ] = f[ 0 ];
            this[ 1 ] = f[ 1 ];
            this[ 2 ] = f[ 2 ];
        },
        _updateFloat4: function ( f ) {
            this[ 0 ] = f[ 0 ];
            this[ 1 ] = f[ 1 ];
            this[ 2 ] = f[ 2 ];
            this[ 3 ] = f[ 3 ];
        },
        _updateFloat9: function ( f ) {
            this[ 0 ] = f[ 0 ];
            this[ 1 ] = f[ 1 ];
            this[ 2 ] = f[ 2 ];
            this[ 3 ] = f[ 3 ];
            this[ 4 ] = f[ 4 ];
            this[ 5 ] = f[ 5 ];
            this[ 6 ] = f[ 6 ];
            this[ 7 ] = f[ 7 ];
            this[ 8 ] = f[ 8 ];
        },
        _updateFloat16: function ( f ) {
            this[ 0 ] = f[ 0 ];
            this[ 1 ] = f[ 1 ];
            this[ 2 ] = f[ 2 ];
            this[ 3 ] = f[ 3 ];
            this[ 4 ] = f[ 4 ];
            this[ 5 ] = f[ 5 ];
            this[ 6 ] = f[ 6 ];
            this[ 7 ] = f[ 7 ];
            this[ 8 ] = f[ 8 ];
            this[ 9 ] = f[ 9 ];
            this[ 10 ] = f[ 10 ];
            this[ 11 ] = f[ 11 ];
            this[ 12 ] = f[ 12 ];
            this[ 13 ] = f[ 13 ];
            this[ 14 ] = f[ 14 ];
            this[ 15 ] = f[ 15 ];
        }
    };

    Uniform.createFloat1 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 0 ];
        }
        var uniform = new Uniform();
        uniform.data = [ value ];
        uniform.glCall = function ( location, glData ) {
            gl.uniform1fv( location, glData );
        };
        uniform.glData = new MACROUTILS.Float32Array( uniform.data );
        uniform.update = Uniform.prototype._updateFloat1;
        uniform.set = function ( value ) {
            if ( typeof value === 'number' ) {
                this.data[ 0 ] = value;
            } else {
                this.data = value;
            }
            this.dirty();
        };

        uniform.name = name;
        uniform.type = 'float';
        return uniform;
    };
    Uniform.createFloat = Uniform.createFloat1;
    Uniform[ 'float' ] = Uniform.createFloat1;
    Uniform.createFloatArray = function ( array, name ) {
        var u = Uniform.createFloat.call( this, array, name );
        u.update = Uniform.prototype._updateArray;
        return u;
    };

    Uniform.createFloat2 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 0, 0 ];
        }
        var uniform = new Uniform();
        uniform.data = value;
        uniform.glCall = function ( location, glData ) {
            gl.uniform2fv( location, glData );
        };
        uniform.glData = new MACROUTILS.Float32Array( uniform.data );
        uniform.update = Uniform.prototype._updateFloat2;
        uniform.name = name;
        uniform.type = 'vec2';
        return uniform;
    };
    Uniform.vec2 = Uniform.createFloat2;
    Uniform.createFloat2Array = function ( array, name ) {
        var u = Uniform.createFloat2.call( this, array, name );
        u.update = Uniform.prototype._updateArray;
        return u;
    };

    Uniform.createFloat3 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 0, 0, 0 ];
        }
        var uniform = new Uniform();
        uniform.data = value;
        uniform.glCall = function ( location, glData ) {
            gl.uniform3fv( location, glData );
        };
        uniform.glData = new MACROUTILS.Float32Array( uniform.data );
        uniform.update = Uniform.prototype._updateFloat3;
        uniform.name = name;
        uniform.type = 'vec3';
        return uniform;
    };
    Uniform.vec3 = Uniform.createFloat3;
    Uniform.createFloat3Array = function ( array, name ) {
        var u = Uniform.createFloat3.call( this, array, name );
        u.update = Uniform.prototype._updateArray;
        return u;
    };

    Uniform.createFloat4 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 0, 0, 0, 0 ];
        }
        var uniform = new Uniform();
        uniform.data = value;
        uniform.glCall = function ( location, glData ) {
            gl.uniform4fv( location, glData );
        };
        uniform.glData = new MACROUTILS.Float32Array( uniform.data );
        uniform.update = Uniform.prototype._updateFloat4;
        uniform.name = name;
        uniform.type = 'vec4';
        return uniform;
    };
    Uniform.vec4 = Uniform.createFloat4;
    Uniform.createFloat4Array = function ( array, name ) {
        var u = Uniform.createFloat4.call( this, array, name );
        u.update = Uniform.prototype._updateArray;
        return u;
    };

    Uniform.createInt1 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 0 ];
        }
        var uniform = new Uniform();
        uniform.data = [ value ];
        uniform.glCall = function ( location, glData ) {
            gl.uniform1iv( location, glData );
        };
        uniform.set = function ( value ) {
            if ( typeof value === 'number' ) {
                this.data[ 0 ] = value;
            } else {
                this.data = value;
            }
            this.dirty();
        };

        uniform.glData = new MACROUTILS.Int32Array( uniform.data );
        uniform.name = name;
        uniform.type = 'int';
        return uniform;
    };
    Uniform[ 'int' ] = Uniform.createInt1;
    Uniform.createInt = Uniform.createInt1;
    Uniform.createIntArray = function ( array, name ) {
        var u = Uniform.createInt.call( this, array, name );
        u.update = Uniform.prototype._updateArray;
        return u;
    };


    Uniform.createInt2 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 0, 0 ];
        }
        var uniform = new Uniform();
        uniform.data = value;
        uniform.glCall = function ( location, glData ) {
            gl.uniform2iv( location, glData );
        };
        uniform.glData = new MACROUTILS.Int32Array( uniform.data );
        uniform.name = name;
        uniform.type = 'vec2i';
        return uniform;
    };
    Uniform.vec2i = Uniform.createInt2;
    Uniform.createInt2Array = function ( array, name ) {
        var u = Uniform.createInt2.call( this, array, name );
        u.update = Uniform.prototype._updateArray;
        return u;
    };

    Uniform.createInt3 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 0, 0, 0 ];
        }
        var uniform = new Uniform();
        uniform.data = value;
        uniform.glCall = function ( location, glData ) {
            gl.uniform3iv( location, glData );
        };
        uniform.glData = new MACROUTILS.Int32Array( uniform.data );
        uniform.name = name;
        uniform.type = 'vec3i';
        return uniform;
    };
    Uniform.vec3i = Uniform.createInt3;
    Uniform.createInt3Array = function ( array, name ) {
        var u = Uniform.createInt3.call( this, array, name );
        u.update = Uniform.prototype._updateArray;
        return u;
    };

    Uniform.createInt4 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 0, 0, 0, 0 ];
        }
        var uniform = new Uniform();
        uniform.data = value;
        uniform.glCall = function ( location, glData ) {
            gl.uniform4iv( location, glData );
        };
        uniform.glData = new MACROUTILS.Int32Array( uniform.data );
        uniform.name = name;
        uniform.type = 'vec4i';
        return uniform;
    };
    Uniform.vec4i = Uniform.createInt4;

    Uniform.createInt4Array = function ( array, name ) {
        var u = Uniform.createInt4.call( this, array, name );
        u.update = Uniform.prototype._updateArray;
        return u;
    };

    Uniform.createMatrix2 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 1, 0, 0, 1 ];
        }
        var uniform = new Uniform();
        uniform.data = value;
        uniform.glCall = function ( location, transpose, glData ) {
            gl.uniformMatrix2fv( location, transpose, glData );
        };
        uniform.apply = uniform.applyMatrix;
        uniform.transpose = false;
        uniform.glData = new MACROUTILS.Float32Array( uniform.data );
        uniform.update = Uniform.prototype._updateFloat4;
        uniform.name = name;
        uniform.type = 'mat2';
        return uniform;
    };
    Uniform.createMat2 = Uniform.createMatrix2;
    Uniform.mat2 = Uniform.createMat2;

    Uniform.createMatrix3 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
        }
        var uniform = new Uniform();
        uniform.data = value;
        uniform.glCall = function ( location, transpose, glData ) {
            gl.uniformMatrix3fv( location, transpose, glData );
        };
        uniform.apply = uniform.applyMatrix;
        uniform.transpose = false;
        uniform.glData = new MACROUTILS.Float32Array( uniform.data );
        uniform.update = Uniform.prototype._updateFloat9;
        uniform.name = name;
        uniform.type = 'mat3';
        return uniform;
    };
    Uniform.createMat3 = Uniform.createMatrix3;
    Uniform.mat3 = Uniform.createMatrix3;

    Uniform.createMatrix4 = function ( data, uniformName ) {
        var value = data;
        var name = uniformName;
        if ( name === undefined ) {
            name = value;
            value = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
        }
        var uniform = new Uniform();
        uniform.data = value;
        uniform.glCall = function ( location, transpose, glData ) {
            gl.uniformMatrix4fv( location, transpose, glData );
        };
        uniform.apply = uniform.applyMatrix;
        uniform.transpose = false;
        uniform.glData = new MACROUTILS.Float32Array( uniform.data );
        uniform.update = Uniform.prototype._updateFloat16;
        uniform.name = name;
        uniform.type = 'mat4';
        return uniform;
    };
    Uniform.createMat4 = Uniform.createMatrix4;
    Uniform.mat4 = Uniform.createMatrix4;

    return Uniform;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Object',
    'osg/BoundingBox',
    'osg/BoundingSphere',
    'osg/StateSet',
    'osg/NodeVisitor',
    'osg/Matrix',
    /* #FIXME enum fix osg/Transform, */
    'osg/ComputeMatrixFromNodePath'
], function ( MACROUTILS, Object, BoundingBox, BoundingSphere, StateSet, NodeVisitor, Matrix, /* #FIXME enum fix Transform,*/ ComputeMatrixFromNodePath ) {

    /** -*- compile-command: 'jslint-cli Node.js' -*- */

    /**
     *  Node that can contains child node
     *  @class Node
     */
    var Node = function () {
        Object.call( this );

        this.children = [];
        this.parents = [];
        this.nodeMask = ~0;
        this.boundingSphere = new BoundingSphere();
        this.boundingSphereComputed = false;
        this._updateCallbacks = [];
        this._cullCallback = undefined;
    };

    /** @lends Node.prototype */
    Node.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( Object.prototype, {
        /**
        Return StateSet and create it if it does not exist yet
        @type StateSet
     */
        getOrCreateStateSet: function () {
            if ( this.stateset === undefined ) {
                this.stateset = new StateSet();
            }
            return this.stateset;
        },
        getStateSet: function () {
            return this.stateset;
        },
        accept: function ( nv ) {
            if ( nv.validNodeMask( this ) ) {
                nv.pushOntoNodePath( this );
                nv.apply( this );
                nv.popFromNodePath();
            }
        },
        dirtyBound: function () {
            if ( this.boundingSphereComputed === true ) {
                this.boundingSphereComputed = false;
                for ( var i = 0, l = this.parents.length; i < l; i++ ) {
                    this.parents[ i ].dirtyBound();
                }
            }
        },
        setNodeMask: function ( mask ) {
            this.nodeMask = mask;
        },
        getNodeMask: function ( mask ) {
            return this.nodeMask;
        },
        setStateSet: function ( s ) {
            this.stateset = s;
        },

        /**
       <p>
        Set update node callback, called during update traversal.
        The Object must have the following method
        update(node, nodeVisitor) {}
        note, callback is responsible for scenegraph traversal so
        they must call traverse(node,nv) to ensure that the
        scene graph subtree (and associated callbacks) are traversed.
        </p>
        <p>
        Here a dummy UpdateCallback example
        </p>
        @example
        var DummyUpdateCallback = function() {};
        DummyUpdateCallback.prototype = {
            update: function(node, nodeVisitor) {
                return true;
            }
        };

        @param Oject callback
     */
        setUpdateCallback: function ( cb ) {
            this._updateCallbacks[ 0 ] = cb;
        },
        /** Get update node callback, called during update traversal.
        @type Oject
     */
        getUpdateCallback: function () {
            return this._updateCallbacks[ 0 ];
        },

        addUpdateCallback: function ( cb ) {
            this._updateCallbacks.push( cb );
        },
        removeUpdateCallback: function ( cb ) {
            var arrayIdx = this._updateCallbacks.indexOf( cb );
            if ( arrayIdx !== -1 )
                this._updateCallbacks.splice( arrayIdx, 1 );
        },
        getUpdateCallbackList: function () {
            return this._updateCallbacks;
        },


        /**
       <p>
        Set cull node callback, called during cull traversal.
        The Object must have the following method
        cull(node, nodeVisitor) {}
        note, callback is responsible for scenegraph traversal so
        they must return true to traverse.
        </p>
        <p>
        Here a dummy CullCallback example
        </p>
        @example
        var DummyCullCallback = function() {};
        DummyCullCallback.prototype = {
            cull: function(node, nodeVisitor) {
                return true;
            }
        };

        @param Oject callback
     */
        setCullCallback: function ( cb ) {
            this._cullCallback = cb;
        },
        getCullCallback: function () {
            return this._cullCallback;
        },

        hasChild: function ( child ) {
            for ( var i = 0, l = this.children.length; i < l; i++ ) {
                if ( this.children[ i ] === child ) {
                    return true;
                }
            }
            return false;
        },
        addChild: function ( child ) {
            var c = this.children.push( child );
            child.addParent( this );
            this.dirtyBound();
            return c;
        },
        getChildren: function () {
            return this.children;
        },
        getParents: function () {
            return this.parents;
        },
        addParent: function ( parent ) {
            this.parents.push( parent );
        },
        removeParent: function ( parent ) {
            for ( var i = 0, l = this.parents.length, parents = this.parents; i < l; i++ ) {
                if ( parents[ i ] === parent ) {
                    parents.splice( i, 1 );
                    return;
                }
            }
        },
        removeChildren: function () {
            var children = this.children;
            if ( children.length !== 0 ) {
                for ( var i = 0, l = children.length; i < l; i++ ) {
                    children[ i ].removeParent( this );
                }
                this.children.splice( 0, this.children.length );
                this.dirtyBound();
            }
        },

        // preserve order
        removeChild: function ( child ) {
            for ( var i = 0, l = this.children.length; i < l; i++ ) {
                if ( this.children[ i ] === child ) {
                    child.removeParent( this );
                    this.children.splice( i, 1 );
                    this.dirtyBound();
                }
            }
        },

        traverse: function ( visitor ) {
            for ( var i = 0, l = this.children.length; i < l; i++ ) {
                var child = this.children[ i ];
                child.accept( visitor );
            }
        },

        ascend: function ( visitor ) {
            for ( var i = 0, l = this.parents.length; i < l; i++ ) {
                var parent = this.parents[ i ];
                parent.accept( visitor );
            }
        },

        getBound: function () {
            if ( !this.boundingSphereComputed ) {
                this.computeBound( this.boundingSphere );
                this.boundingSphereComputed = true;
            }
            return this.boundingSphere;
        },

        computeBound: function ( bsphere ) {
            var bb = new BoundingBox();
            bb.init();
            bsphere.init();
            for ( var i = 0, l = this.children.length; i < l; i++ ) {
                var child = this.children[ i ];
                if ( child.referenceFrame === undefined || child.referenceFrame === 0 /* #FIXME enum fix Transform.RELATIVE_RF*/ ) {
                    bb.expandBySphere( child.getBound() );
                }
            }
            if ( !bb.valid() ) {
                return bsphere;
            }
            bsphere._center = bb.center();
            bsphere._radius = 0.0;
            for ( var j = 0, l2 = this.children.length; j < l2; j++ ) {
                var cc = this.children[ j ];
                if ( cc.referenceFrame === undefined || cc.referenceFrame === 0 /* #FIXME enum fix Transform.RELATIVE_RF*/ ) {
                    bsphere.expandRadiusBySphere( cc.getBound() );
                }
            }

            return bsphere;
        },

        getWorldMatrices: function ( halt ) {
            var CollectParentPaths = function ( halt ) {
                this.nodePaths = [];
                this.halt = halt;
                NodeVisitor.call( this, NodeVisitor.TRAVERSE_PARENTS );
            };
            CollectParentPaths.prototype = MACROUTILS.objectInehrit( NodeVisitor.prototype, {
                apply: function ( node ) {
                    if ( node.parents.length === 0 || node === this.halt ) {
                        // copy
                        this.nodePaths.push( this.nodePath.slice( 0 ) );
                    } else {
                        this.traverse( node );
                    }
                }
            } );
            var collected = new CollectParentPaths( halt );
            this.accept( collected );
            var matrixList = [];

            for ( var i = 0, l = collected.nodePaths.length; i < l; i++ ) {
                var np = collected.nodePaths[ i ];
                if ( np.length === 0 ) {
                    matrixList.push( Matrix.makeIdentity( [] ) );
                } else {
                    matrixList.push( ComputeMatrixFromNodePath.computeLocalToWorld( np ) );
                }
            }
            return matrixList;
        }


    } ), 'osg', 'Node' );
    Node.prototype.objectType = MACROUTILS.objectType.generate( 'Node' );

    return Node;
} );
/*global define */

define( [], function () {

    var NodeVisitor = function ( traversalMode ) {
        this.traversalMask = ~0x0;
        this.nodeMaskOverride = 0;
        this.traversalMode = traversalMode;
        if ( traversalMode === undefined ) {
            this.traversalMode = NodeVisitor.TRAVERSE_ALL_CHILDREN;
        }
        this.nodePath = [];
    };
    //NodeVisitor.TRAVERSE_NONE = 0;
    NodeVisitor.TRAVERSE_PARENTS = 1;
    NodeVisitor.TRAVERSE_ALL_CHILDREN = 2;
    //NodeVisitor.TRAVERSE_ACTIVE_CHILDREN = 3;
    NodeVisitor._traversalFunctions = {};
    NodeVisitor._traversalFunctions[ NodeVisitor.TRAVERSE_PARENTS ] = function ( node ) {
        node.ascend( this );
    };
    NodeVisitor._traversalFunctions[ NodeVisitor.TRAVERSE_ALL_CHILDREN ] = function ( node ) {
        node.traverse( this );
    };

    NodeVisitor._pushOntoNodePath = {};
    NodeVisitor._pushOntoNodePath[ NodeVisitor.TRAVERSE_PARENTS ] = function ( node ) {
        this.nodePath.unshift( node );
    };
    NodeVisitor._pushOntoNodePath[ NodeVisitor.TRAVERSE_ALL_CHILDREN ] = function ( node ) {
        this.nodePath.push( node );
    };

    NodeVisitor._popFromNodePath = {};
    NodeVisitor._popFromNodePath[ NodeVisitor.TRAVERSE_PARENTS ] = function () {
        return this.nodePath.shift();
    };
    NodeVisitor._popFromNodePath[ NodeVisitor.TRAVERSE_ALL_CHILDREN ] = function () {
        this.nodePath.pop();
    };

    NodeVisitor.prototype = {
        setNodeMaskOverride: function ( m ) {
            this.nodeMaskOverride = m;
        },
        getNodeMaskOverride: function () {
            return this.nodeMaskOverride;
        },

        setTraversalMask: function ( m ) {
            this.traversalMask = m;
        },
        getTraversalMask: function () {
            return this.traversalMask;
        },

        pushOntoNodePath: function ( node ) {
            NodeVisitor._pushOntoNodePath[ this.traversalMode ].call( this, node );
        },
        popFromNodePath: function () {
            NodeVisitor._popFromNodePath[ this.traversalMode ].call( this );
        },
        validNodeMask: function ( node ) {
            var nm = node.getNodeMask();
            return ( ( this.traversalMask & ( this.nodeMaskOverride | nm ) ) !== 0 );
        },
        apply: function ( node ) {
            this.traverse( node );
        },
        traverse: function ( node ) {
            NodeVisitor._traversalFunctions[ this.traversalMode ].call( this, node );
        }
    };

    return NodeVisitor;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Node',
    'osg/Matrix',
    'osg/Vec3'
], function ( MACROUTILS, Node, Matrix, Vec3 ) {
    /** -*- compile-command: "jslint-cli Transform.js" -*- */

    /** 
     * Transform - base class for Transform type node ( Camera, MatrixTransform )
     * @class Transform
     * @inherits Node
     */
    var Transform = function () {
        Node.call( this );
        this.referenceFrame = Transform.RELATIVE_RF;
    };
    Transform.RELATIVE_RF = 0;
    Transform.ABSOLUTE_RF = 1;

    /** @lends Transform.prototype */
    Transform.prototype = MACROUTILS.objectInehrit( Node.prototype, {
        setReferenceFrame: function ( value ) {
            this.referenceFrame = value;
        },
        getReferenceFrame: function () {
            return this.referenceFrame;
        },

        computeBound: function ( bsphere ) {
            Node.prototype.computeBound.call( this, bsphere );
            if ( !bsphere.valid() ) {
                return bsphere;
            }
            var matrix = Matrix.makeIdentity( [] );
            this.computeLocalToWorldMatrix( matrix );

            var xdash = Vec3.copy( bsphere._center, [] );
            xdash[ 0 ] += bsphere._radius;
            Matrix.transformVec3( matrix, xdash, xdash );

            var ydash = Vec3.copy( bsphere._center, [] );
            ydash[ 1 ] += bsphere._radius;
            Matrix.transformVec3( matrix, ydash, ydash );

            var zdash = Vec3.copy( bsphere._center, [] );
            zdash[ 2 ] += bsphere._radius;
            Matrix.transformVec3( matrix, zdash, zdash );

            Matrix.transformVec3( matrix, bsphere._center, bsphere._center );

            Vec3.sub( xdash,
                bsphere._center,
                xdash );
            var len_xdash = Vec3.length( xdash );

            Vec3.sub( ydash,
                bsphere._center,
                ydash );
            var len_ydash = Vec3.length( ydash );

            Vec3.sub( zdash,
                bsphere._center,
                zdash );
            var len_zdash = Vec3.length( zdash );

            bsphere._radius = len_xdash;
            if ( bsphere._radius < len_ydash ) {
                bsphere._radius = len_ydash;
            }
            if ( bsphere._radius < len_zdash ) {
                bsphere._radius = len_zdash;
            }
            return bsphere;
        }
    } );

    return Transform;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Matrix',
    'osg/Transform'
], function ( MACROUTILS, Matrix, Transform ) {

    /** -*- compile-command: 'jslint-cli Node.js' -*- */

    /** 
     *  MatrixTransform is a Transform Node that can be customized with user matrix
     *  @class MatrixTransform
     */
    var MatrixTransform = function () {
        Transform.call( this );
        this.matrix = Matrix.makeIdentity( [] );
    };

    /** @lends MatrixTransform.prototype */
    MatrixTransform.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( Transform.prototype, {
        getMatrix: function () {
            return this.matrix;
        },
        setMatrix: function ( m ) {
            this.matrix = m;
        },
        computeLocalToWorldMatrix: function ( matrix, nodeVisitor ) {
            if ( this.referenceFrame === Transform.RELATIVE_RF ) {
                Matrix.preMult( matrix, this.matrix );
            } else {
                matrix = this.matrix;
            }
            return true;
        },
        computeWorldToLocalMatrix: function ( matrix, nodeVisitor ) {
            var minverse = [];
            Matrix.inverse( this.matrix, minverse );
            if ( this.referenceFrame === Transform.RELATIVE_RF ) {
                Matrix.postMult( minverse, matrix );
            } else { // absolute
                matrix = inverse;
            }
            return true;
        }
    } ), 'osg', 'MatrixTransform' );
    MatrixTransform.prototype.objectType = MACROUTILS.objectType.generate( 'MatrixTransform' );

    return MatrixTransform;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/StateAttribute'
], function ( MACROUTILS, StateAttribute ) {

    /** 
     *  Manage Blending mode
     *  @class BlendFunc
     */
    var BlendFunc = function ( sourceRGB, destinationRGB, sourceAlpha, destinationAlpha ) {
        StateAttribute.call( this );
        this._sourceFactor = BlendFunc.ONE;
        this._destinationFactor = BlendFunc.ZERO;
        this._sourceFactorAlpha = this._sourceFactor;
        this._destinationFactorAlpha = this._destinationFactor;
        this._separate = false;
        if ( sourceRGB !== undefined ) {
            this.setSource( sourceRGB );
        }
        if ( destinationRGB !== undefined ) {
            this.setDestination( destinationRGB );
        }

        if ( sourceAlpha !== undefined ) {
            this.setSourceAlpha( sourceAlpha );
        }
        if ( destinationAlpha !== undefined ) {
            this.setDestinationAlpha( destinationAlpha );
        }
    };

    BlendFunc.ZERO = 0;
    BlendFunc.ONE = 1;
    BlendFunc.SRC_COLOR = 0x0300;
    BlendFunc.ONE_MINUS_SRC_COLOR = 0x0301;
    BlendFunc.SRC_ALPHA = 0x0302;
    BlendFunc.ONE_MINUS_SRC_ALPHA = 0x0303;
    BlendFunc.DST_ALPHA = 0x0304;
    BlendFunc.ONE_MINUS_DST_ALPHA = 0x0305;
    BlendFunc.DST_COLOR = 0x0306;
    BlendFunc.ONE_MINUS_DST_COLOR = 0x0307;
    BlendFunc.SRC_ALPHA_SATURATE = 0x0308;

    /* Separate Blend Functions */
    BlendFunc.BLEND_DST_RGB = 0x80C8;
    BlendFunc.BLEND_SRC_RGB = 0x80C9;
    BlendFunc.BLEND_DST_ALPHA = 0x80CA;
    BlendFunc.BLEND_SRC_ALPHA = 0x80CB;
    BlendFunc.CONSTANT_COLOR = 0x8001;
    BlendFunc.ONE_MINUS_CONSTANT_COLOR = 0x8002;
    BlendFunc.CONSTANT_ALPHA = 0x8003;
    BlendFunc.ONE_MINUS_CONSTANT_ALPHA = 0x8004;
    BlendFunc.BLEND_COLOR = 0x8005;


    /** @lends BlendFunc.prototype */
    BlendFunc.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {
        /** 
    StateAttribute type of BlendFunc
    @type String
     */
        attributeType: 'BlendFunc',
        /** 
        Create an instance of this StateAttribute
        */
        cloneType: function () /**BlendFunc*/ {
            return new BlendFunc();
        },
        /** 
        @type String
        */
        getType: function () {
            return this.attributeType;
        },
        /** 
        @type String
        */
        getTypeMember: function () {
            return this.attributeType;
        },
        setSource: function ( f ) {
            this.setSourceRGB( f );
            this.setSourceAlpha( f );
        },
        setDestination: function ( f ) {
            this.setDestinationRGB( f );
            this.setDestinationAlpha( f );
        },
        checkSeparate: function () {
            return ( this._sourceFactor !== this._sourceFactorAlpha ||
                this._destinationFactor !== this._destinationFactorAlpha );
        },
        setSourceRGB: function ( f ) {
            if ( typeof f === 'string' ) {
                this._sourceFactor = BlendFunc[ f ];
            } else {
                this._sourceFactor = f;
            }
            this._separate = this.checkSeparate();
        },
        setSourceAlpha: function ( f ) {
            if ( typeof f === 'string' ) {
                this._sourceFactorAlpha = BlendFunc[ f ];
            } else {
                this._sourceFactorAlpha = f;
            }
            this._separate = this.checkSeparate();
        },
        setDestinationRGB: function ( f ) {
            if ( typeof f === 'string' ) {
                this._destinationFactor = BlendFunc[ f ];
            } else {
                this._destinationFactor = f;
            }
            this._separate = this.checkSeparate();
        },
        setDestinationAlpha: function ( f ) {
            if ( typeof f === 'string' ) {
                this._destinationFactorAlpha = BlendFunc[ f ];
            } else {
                this._destinationFactorAlpha = f;
            }
            this._separate = this.checkSeparate();
        },

        /** 
        Apply the mode, must be called in the draw traversal
        @param state
    */
        apply: function ( state ) {
            var gl = state.getGraphicContext();
            gl.enable( gl.BLEND );
            if ( this._separate ) {
                gl.blendFuncSeparate( this._sourceFactor, this._destinationFactor,
                    this._sourceFactorAlpha, this._destinationFactorAlpha );
            } else {
                gl.blendFunc( this._sourceFactor, this._destinationFactor );
            }
        }
    } ), 'osg', 'BlendFunc' );

    return BlendFunc;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/StateAttribute'
], function ( MACROUTILS, StateAttribute ) {

    /** 
     *  Manage BlendColor attribute
     *  @class BlendColor
     */
    var BlendColor = function ( color ) {
        StateAttribute.call( this );
        this._constantColor = new Array( 4 );
        this._constantColor[ 0 ] = this._constantColor[ 1 ] = this._constantColor[ 2 ] = this._constantColor[ 3 ] = 1.0;
        if ( color !== undefined ) {
            this.setConstantColor( color );
        }
    };

    /** @lends BlendColor.prototype */
    BlendColor.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {
        attributeType: 'BlendColor',
        cloneType: function () {
            return new BlendColor();
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType;
        },
        getConstantColor: function () {
            return this._constantColor;
        },
        apply: function ( state ) {
            var gl = state.getGraphicContext();
            gl.blendColor( this._constantColor[ 0 ],
                this._constantColor[ 1 ],
                this._constantColor[ 2 ],
                this._constantColor[ 3 ] );
            this._dirty = false;
        }
    } ), 'osg', 'BlendColor' );

    return BlendColor;
} );
/*global define */

define( [
    'osg/Utils'
], function ( MACROUTILS ) {

    var BoundingBox = function () {
        this.init();
    };
    BoundingBox.prototype = MACROUTILS.objectLibraryClass( {
        _cache_radius2_tmp: [ 0, 0, 0 ],

        init: function () {
            this._min = [ Infinity, Infinity, Infinity ];
            this._max = [ -Infinity, -Infinity, -Infinity ];
        },

        valid: function () {
            return ( this._max[ 0 ] >= this._min[ 0 ] && this._max[ 1 ] >= this._min[ 1 ] && this._max[ 2 ] >= this._min[ 2 ] );
        },

        expandBySphere: function ( sh ) {
            if ( !sh.valid() ) {
                return;
            }
            var max = this._max;
            var min = this._min;
            min[ 0 ] = Math.min( min[ 0 ], sh._center[ 0 ] - sh._radius );
            min[ 1 ] = Math.min( min[ 1 ], sh._center[ 1 ] - sh._radius );
            min[ 2 ] = Math.min( min[ 2 ], sh._center[ 2 ] - sh._radius );

            max[ 0 ] = Math.max( max[ 0 ], sh._center[ 0 ] + sh._radius );
            max[ 1 ] = Math.max( max[ 1 ], sh._center[ 1 ] + sh._radius );
            max[ 2 ] = Math.max( max[ 2 ], sh._center[ 2 ] + sh._radius );
        },

        expandByVec3: function ( v ) {
            var min = this._min;
            var max = this._max;
            min[ 0 ] = Math.min( min[ 0 ], v[ 0 ] );
            min[ 1 ] = Math.min( min[ 1 ], v[ 1 ] );
            min[ 2 ] = Math.min( min[ 2 ], v[ 2 ] );

            max[ 0 ] = Math.max( max[ 0 ], v[ 0 ] );
            max[ 1 ] = Math.max( max[ 1 ], v[ 1 ] );
            max[ 2 ] = Math.max( max[ 2 ], v[ 2 ] );
        },

        center: function () {
            var min = this._min;
            var max = this._max;
            return [ ( min[ 0 ] + max[ 0 ] ) * 0.5, ( min[ 1 ] + max[ 1 ] ) * 0.5, ( min[ 2 ] + max[ 2 ] ) * 0.5 ];
        },

        radius: function () {
            return Math.sqrt( this.radius2() );
        },

        radius2: function () {
            var min = this._min;
            var max = this._max;
            var cache = this._cache_radius2_tmp;
            cache[ 0 ] = max[ 0 ] - min[ 0 ];
            cache[ 1 ] = max[ 1 ] - min[ 1 ];
            cache[ 2 ] = max[ 2 ] - min[ 2 ];
            return 0.25 * ( cache[ 0 ] * cache[ 0 ] + cache[ 1 ] * cache[ 1 ] + cache[ 2 ] * cache[ 2 ] );
        },
        corner: function ( pos ) {
            ret = [ 0.0, 0.0, 0.0 ];
            if ( pos & 1 ) {
                ret[ 0 ] = this._max[ 0 ];
            } else {
                ret[ 0 ] = this._min[ 0 ];
            }
            if ( pos & 2 ) {
                ret[ 1 ] = this._max[ 1 ];
            } else {
                ret[ 1 ] = this._min[ 1 ];
            }
            if ( pos & 4 ) {
                ret[ 2 ] = this._max[ 2 ];
            } else {
                ret[ 2 ] = this._min[ 2 ];
            }
            return ret;
        }
    }, 'osg', 'BoundingBox' );

    return BoundingBox;
} );
/*global define */

define( [
    'osg/Vec3'
], function ( Vec3 ) {

    var BoundingSphere = function () {
        this._center = [ 0.0, 0.0, 0.0 ];
        this._radius = -1;
    };
    // #FIXME use obj.objectLibraryClass ?
    BoundingSphere.prototype = {
        init: function () {
            this._center = [ 0.0, 0.0, 0.0 ];
            this._radius = -1;
        },
        valid: function () {
            return this._radius >= 0.0;
        },
        set: function ( center, radius ) {
            this._center = center;
            this._radius = radius;
        },
        center: function () {
            return this._center;
        },
        radius: function () {
            return this._radius;
        },
        radius2: function () {
            return this._radius * this._radius;
        },

        expandByBox: function ( bb ) {
            if ( bb.valid() ) {
                var c;
                if ( this.valid() ) {
                    var newbb = new BoundingBox();
                    newbb._min[ 0 ] = bb._min[ 0 ];
                    newbb._min[ 1 ] = bb._min[ 1 ];
                    newbb._min[ 2 ] = bb._min[ 2 ];
                    newbb._max[ 0 ] = bb._max[ 0 ];
                    newbb._max[ 1 ] = bb._max[ 1 ];
                    newbb._max[ 2 ] = bb._max[ 2 ];

                    // this code is not valid c is defined after the loop
                    // FIXME
                    for ( var i = 0; i < 8; i++ ) {
                        var v = Vec3.sub( bb.corner( c ), this._center, [] ); // get the direction vector from corner
                        Vec3.normalize( v, v ); // normalise it.
                        nv[ 0 ] *= -this._radius; // move the vector in the opposite direction distance radius.
                        nv[ 1 ] *= -this._radius; // move the vector in the opposite direction distance radius.
                        nv[ 2 ] *= -this._radius; // move the vector in the opposite direction distance radius.
                        nv[ 0 ] += this._center[ 0 ]; // move to absolute position.
                        nv[ 1 ] += this._center[ 1 ]; // move to absolute position.
                        nv[ 2 ] += this._center[ 2 ]; // move to absolute position.
                        newbb.expandBy( nv ); // add it into the new bounding box.
                    }

                    c = newbb.center();
                    this._center[ 0 ] = c[ 0 ];
                    this._center[ 1 ] = c[ 1 ];
                    this._center[ 2 ] = c[ 2 ];
                    this._radius = newbb.radius();
                } else {
                    c = bb.center();
                    this._center[ 0 ] = c[ 0 ];
                    this._center[ 1 ] = c[ 1 ];
                    this._center[ 2 ] = c[ 2 ];
                    this._radius = bb.radius();
                }
            }

        },

        expandByVec3: function ( v ) {
            if ( this.valid() ) {
                var dv = Vec3.sub( v, this.center(), [] );
                r = Vec3.length( dv );
                if ( r > this.radius() ) {
                    dr = ( r - this.radius() ) * 0.5;
                    this._center[ 0 ] += dv[ 0 ] * ( dr / r );
                    this._center[ 1 ] += dv[ 1 ] * ( dr / r );
                    this._center[ 2 ] += dv[ 2 ] * ( dr / r );
                    this._radius += dr;
                }
            } else {
                this._center[ 0 ] = v[ 0 ];
                this._center[ 1 ] = v[ 1 ];
                this._center[ 2 ] = v[ 2 ];
                this._radius = 0.0;
            }
        },

        expandRadiusBySphere: function ( sh ) {
            if ( sh.valid() ) {
                if ( this.valid() ) {
                    var sub = Vec3.sub;
                    var length = Vec3.length;
                    var r = length( sub( sh._center,
                        this._center, [] ) ) + sh._radius;
                    if ( r > this._radius ) {
                        this._radius = r;
                    }
                    // else do nothing as vertex is within sphere.
                } else {
                    this._center = Vec3.copy( sh._center, [] );
                    this._radius = sh._radius;
                }
            }
        },
        expandBy: function ( sh ) {
            // ignore operation if incomming BoundingSphere is invalid.
            if ( !sh.valid() ) {
                return;
            }

            // This sphere is not set so use the inbound sphere
            if ( !this.valid() ) {
                this._center[ 0 ] = sh._center[ 0 ];
                this._center[ 1 ] = sh._center[ 1 ];
                this._center[ 2 ] = sh._center[ 2 ];
                this._radius = sh.radius();

                return;
            }


            // Calculate d == The distance between the sphere centers
            var tmp = Vec3.sub( this.center(), sh.center(), [] );
            d = Vec3.length( tmp );

            // New sphere is already inside this one
            if ( d + sh.radius() <= this.radius() ) {
                return;
            }

            //  New sphere completely contains this one
            if ( d + this.radius() <= sh.radius() ) {
                this._center[ 0 ] = sh._center[ 0 ];
                this._center[ 1 ] = sh._center[ 1 ];
                this._center[ 2 ] = sh._center[ 2 ];
                this._radius = sh._radius;
                return;
            }


            // Build a new sphere that completely contains the other two:
            //
            // The center point lies halfway along the line between the furthest
            // points on the edges of the two spheres.
            //
            // Computing those two points is ugly - so we'll use similar triangles
            new_radius = ( this.radius() + d + sh.radius() ) * 0.5;
            ratio = ( new_radius - this.radius() ) / d;

            this._center[ 0 ] += ( sh._center[ 0 ] - this._center[ 0 ] ) * ratio;
            this._center[ 1 ] += ( sh._center[ 1 ] - this._center[ 1 ] ) * ratio;
            this._center[ 2 ] += ( sh._center[ 2 ] - this._center[ 2 ] ) * ratio;

            this._radius = new_radius;

        },
        contains: function ( v ) {
            var vc = Vec3.sub( v, this.center(), [] );
            return valid() && ( Vec3.length2( vc ) <= radius2() );
        },
        intersects: function ( bs ) {
            var lc = Vec3.length2( Vec3.sub( this.center(),
                bs.center(), [] ) );
            return valid() && bs.valid() &&
                ( lc <= ( this.radius() + bs.radius() ) * ( this.radius() + bs.radius() ) );
        }
    };

    return BoundingSphere;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/Object'
], function ( Notify, MACROUTILS, Object ) {

    /** -*- compile-command: 'jslint-cli BufferArray.js' -*- */

    /**
     * BufferArray manage vertex / normal / ... array used by webgl.
     * @class BufferArray
     */
    var BufferArray = function ( type, elements, itemSize ) {

        // maybe could inherit from Object
        this._instanceID = Object.getInstanceID();

        this.dirty();

        this._itemSize = itemSize;
        if ( typeof ( type ) === 'string' ) {
            type = BufferArray[ type ];
        }
        this._type = type;

        if ( elements !== undefined ) {
            if ( this._type === BufferArray.ELEMENT_ARRAY_BUFFER ) {
                this._elements = new MACROUTILS.Uint16Array( elements );
            } else {
                this._elements = new MACROUTILS.Float32Array( elements );
            }
        }
    };

    BufferArray.ELEMENT_ARRAY_BUFFER = 0x8893;
    BufferArray.ARRAY_BUFFER = 0x8892;


    /** @lends BufferArray.prototype */
    BufferArray.prototype = {
        setItemSize: function ( size ) {
            this._itemSize = size;
        },
        isValid: function () {
            if ( this._buffer !== undefined ||
                this._elements !== undefined ) {
                return true;
            }
            return false;
        },

        releaseGLObjects: function ( gl ) {
            if ( this._buffer !== undefined && this._buffer !== null ) {
                gl.deleteBuffer( this._buffer );
            }
            this._buffer = undefined;
        },

        bind: function ( gl ) {

            var type = this._type;
            var buffer = this._buffer;

            if ( buffer ) {
                gl.bindBuffer( type, buffer );
                return;
            }

            if ( !buffer && this._elements.length > 0 ) {
                this._buffer = gl.createBuffer();
                this._numItems = this._elements.length / this._itemSize;
                gl.bindBuffer( type, this._buffer );
            }
        },
        getItemSize: function () {
            return this._itemSize;
        },
        dirty: function () {
            this._dirty = true;
        },
        isDirty: function () {
            return this._dirty;
        },
        compile: function ( gl ) {
            if ( this._dirty ) {
                gl.bufferData( this._type, this._elements, gl.STATIC_DRAW );
                this._dirty = false;
            }
        },
        getElements: function () {
            return this._elements;
        },
        setElements: function ( elements ) {
            this._elements = elements;
            this._dirty = true;
        }
    };

    BufferArray.create = function ( type, elements, itemSize ) {
        Notify.log( 'BufferArray.create is deprecated, use new BufferArray with same arguments instead' );
        return new BufferArray( type, elements, itemSize );
    };

    return BufferArray;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/StateAttribute'
], function ( MACROUTILS, StateAttribute ) {

    /** 
     *  Manage CullFace attribute
     *  @class CullFace
     */
    var CullFace = function ( mode ) {
        StateAttribute.call( this );
        if ( mode === undefined ) {
            mode = CullFace.BACK;
        }
        this.setMode( mode );
    };

    CullFace.DISABLE = 0x0;
    CullFace.FRONT = 0x0404;
    CullFace.BACK = 0x0405;
    CullFace.FRONT_AND_BACK = 0x0408;

    /** @lends CullFace.prototype */
    CullFace.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {
        attributeType: 'CullFace',
        cloneType: function () {
            return new CullFace();
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType;
        },
        setMode: function ( mode ) {
            if ( typeof mode === 'string' ) {
                mode = CullFace[ mode ];
            }
            this._mode = mode;
        },
        getMode: function () {
            return this._mode;
        },
        apply: function ( state ) {
            var gl = state.getGraphicContext();
            if ( this._mode === CullFace.DISABLE ) {
                gl.disable( gl.CULL_FACE );
            } else {
                gl.enable( gl.CULL_FACE );
                gl.cullFace( this._mode );
            }
            this._dirty = false;
        }
    } ), 'osg', 'CullFace' );

    return CullFace;
} );
/*global define */

define( [], function () {

    var CullSettings = function () {
        this._computeNearFar = true;
        this._nearFarRatio = 0.005;

        var lookVector = [ 0.0, 0.0, -1.0 ];
        this.bbCornerFar = ( lookVector[ 0 ] >= 0 ? 1 : 0 ) | ( lookVector[ 1 ] >= 0 ? 2 : 0 ) | ( lookVector[ 2 ] >= 0 ? 4 : 0 );
        this.bbCornerNear = ( ~this.bbCornerFar ) & 7;
    };

    CullSettings.prototype = {
        setCullSettings: function ( settings ) {
            this._computeNearFar = settings._computeNearFar;
            this._nearFarRatio = settings._nearFarRatio;
        },
        setNearFarRatio: function ( ratio ) {
            this._nearFarRatio = ratio;
        },
        getNearFarRatio: function () {
            return this._nearFarRatio;
        },
        setComputeNearFar: function ( value ) {
            this._computeNearFar = value;
        },
        getComputeNearFar: function () {
            return this._computeNearFar;
        }
    };

    return CullSettings;
} );
/*global define */

define( [], function () {

    var CullStack = function () {
        this._modelviewMatrixStack = [];
        this._projectionMatrixStack = [];
        this._viewportStack = [];
        this._bbCornerFar = 0;
        this._bbCornerNear = 0;
    };

    CullStack.prototype = {
        getProjectionMatrixStack: function () {
            return this._projectionMatrixStack;
        },
        getModelviewMatrixStack: function () {
            return this._modelviewMatrixStack;
        },
        getCurrentProjectionMatrix: function () {
            return this._projectionMatrixStack[ this._projectionMatrixStack.length - 1 ];
        },
        getCurrentModelviewMatrix: function () {
            return this._modelviewMatrixStack[ this._modelviewMatrixStack.length - 1 ];
        },
        getViewport: function () {
            if ( this._viewportStack.length === 0 ) {
                return undefined;
            }
            return this._viewportStack[ this._viewportStack.length - 1 ];
        },
        getLookVectorLocal: function () {
            var m = this._modelviewMatrixStack[ this._modelviewMatrixStack.length - 1 ];
            return [ -m[ 2 ], -m[ 6 ], -m[ 10 ] ];
        },
        pushViewport: function ( vp ) {
            this._viewportStack.push( vp );
        },
        popViewport: function () {
            this._viewportStack.pop();
        },
        pushModelviewMatrix: function ( matrix ) {
            this._modelviewMatrixStack.push( matrix );

            var lookVector = this.getLookVectorLocal();
            this._bbCornerFar = ( lookVector[ 0 ] >= 0 ? 1 : 0 ) | ( lookVector[ 1 ] >= 0 ? 2 : 0 ) | ( lookVector[ 2 ] >= 0 ? 4 : 0 );
            this._bbCornerNear = ( ~this._bbCornerFar ) & 7;
        },
        popModelviewMatrix: function () {

            this._modelviewMatrixStack.pop();
            var lookVector;
            if ( this._modelviewMatrixStack.length !== 0 ) {
                lookVector = this.getLookVectorLocal();
            } else {
                lookVector = [ 0, 0, -1 ];
            }
            this._bbCornerFar = ( lookVector[ 0 ] >= 0 ? 1 : 0 ) | ( lookVector[ 1 ] >= 0 ? 2 : 0 ) | ( lookVector[ 2 ] >= 0 ? 4 : 0 );
            this._bbCornerNear = ( ~this._bbCornerFar ) & 7;

        },
        pushProjectionMatrix: function ( matrix ) {
            this._projectionMatrixStack.push( matrix );
        },
        popProjectionMatrix: function () {
            this._projectionMatrixStack.pop();
        }
    };

    return CullStack;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Transform',
    'osg/CullSettings',
    'osg/Matrix'
], function ( MACROUTILS, Transform, CullSettings, Matrix ) {

    /** 
     * Camera - is a subclass of Transform which represents encapsulates the settings of a Camera.
     * @class Camera
     * @inherits Transform CullSettings
     */
    var Camera = function () {
        Transform.call( this );
        CullSettings.call( this );

        this.viewport = undefined;
        this.setClearColor( [ 0, 0, 0, 1.0 ] );
        this.setClearDepth( 1.0 );
        this.setClearMask( Camera.COLOR_BUFFER_BIT | Camera.DEPTH_BUFFER_BIT );
        this.setViewMatrix( Matrix.makeIdentity( [] ) );
        this.setProjectionMatrix( Matrix.makeIdentity( [] ) );
        this.renderOrder = Camera.NESTED_RENDER;
        this.renderOrderNum = 0;
    };

    Camera.PRE_RENDER = 0;
    Camera.NESTED_RENDER = 1;
    Camera.POST_RENDER = 2;

    Camera.COLOR_BUFFER_BIT = 0x00004000;
    Camera.DEPTH_BUFFER_BIT = 0x00000100;
    Camera.STENCIL_BUFFER_BIT = 0x00000400;

    /** @lends Camera.prototype */
    Camera.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit(
        CullSettings.prototype,
        MACROUTILS.objectInehrit( Transform.prototype, {

            setClearDepth: function ( depth ) {
                this.clearDepth = depth;
            },
            getClearDepth: function () {
                return this.clearDepth;
            },

            setClearMask: function ( mask ) {
                this.clearMask = mask;
            },
            getClearMask: function () {
                return this.clearMask;
            },

            setClearColor: function ( color ) {
                this.clearColor = color;
            },
            getClearColor: function () {
                return this.clearColor;
            },

            setViewport: function ( vp ) {
                this.viewport = vp;
                this.getOrCreateStateSet().setAttributeAndMode( vp );
            },
            getViewport: function () {
                return this.viewport;
            },


            setViewMatrix: function ( matrix ) {
                this.modelviewMatrix = matrix;
            },

            setProjectionMatrix: function ( matrix ) {
                this.projectionMatrix = matrix;
            },

            /** Set to an orthographic projection. See OpenGL glOrtho for documentation further details.*/
            setProjectionMatrixAsOrtho: function ( left, right,
                bottom, top,
                zNear, zFar ) {
                Matrix.makeOrtho( left, right, bottom, top, zNear, zFar, this.getProjectionMatrix() );
            },

            getViewMatrix: function () {
                return this.modelviewMatrix;
            },
            getProjectionMatrix: function () {
                return this.projectionMatrix;
            },
            getRenderOrder: function () {
                return this.renderOrder;
            },
            setRenderOrder: function ( order, orderNum ) {
                this.renderOrder = order;
                this.renderOrderNum = orderNum;
            },

            attachTexture: function ( bufferComponent, texture, level ) {
                if ( this.frameBufferObject ) {
                    this.frameBufferObject.dirty();
                }
                if ( level === undefined ) {
                    level = 0;
                }
                if ( this.attachments === undefined ) {
                    this.attachments = {};
                }
                this.attachments[ bufferComponent ] = {
                    'texture': texture,
                    'level': level
                };
            },

            attachRenderBuffer: function ( bufferComponent, internalFormat ) {
                if ( this.frameBufferObject ) {
                    this.frameBufferObject.dirty();
                }
                if ( this.attachments === undefined ) {
                    this.attachments = {};
                }
                this.attachments[ bufferComponent ] = {
                    'format': internalFormat
                };
            },

            computeLocalToWorldMatrix: function ( matrix, nodeVisitor ) {
                if ( this.referenceFrame === Transform.RELATIVE_RF ) {
                    Matrix.preMult( matrix, this.modelviewMatrix );
                } else { // absolute
                    matrix = this.modelviewMatrix;
                }
                return true;
            },

            computeWorldToLocalMatrix: function ( matrix, nodeVisitor ) {
                var inverse = [];
                Matrix.inverse( this.modelviewMatrix, inverse );
                if ( this.referenceFrame === Transform.RELATIVE_RF ) {
                    Matrix.postMult( inverse, matrix );
                } else {
                    matrix = inverse;
                }
                return true;
            }

        } ) ), 'osg', 'Camera' );
    Camera.prototype.objectType = MACROUTILS.objectType.generate( 'Camera' );


    return Camera;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/StateAttribute'
], function ( MACROUTILS, StateAttribute, Depth ) {

    var Depth = function ( func, near, far, writeMask ) {
        StateAttribute.call( this );

        this._func = Depth.LESS;
        this._near = 0.0;
        this._far = 1.0;
        this._writeMask = true;

        if ( func !== undefined ) {
            if ( typeof ( func ) === 'string' ) {
                this._func = Depth[ func ];
            } else {
                this._func = func;
            }
        }
        if ( near !== undefined ) {
            this._near = near;
        }
        if ( far !== undefined ) {
            this._far = far;
        }
        if ( writeMask !== undefined ) {
            this._writeMask = writeMask;
        }
    };

    Depth.DISABLE = 0x0000;
    Depth.NEVER = 0x0200;
    Depth.LESS = 0x0201;
    Depth.EQUAL = 0x0202;
    Depth.LEQUAL = 0x0203;
    Depth.GREATE = 0x0204;
    Depth.NOTEQU = 0x0205;
    Depth.GEQUAL = 0x0206;
    Depth.ALWAYS = 0x0207;

    Depth.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {
        attributeType: 'Depth',
        cloneType: function () {
            return new Depth();
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType;
        },
        setRange: function ( near, far ) {
            this._near = near;
            this._far = far;
        },
        setWriteMask: function ( mask ) {
            this._writeMask = mask;
        },
        apply: function ( state ) {
            var gl = state.getGraphicContext();
            if ( this._func === 0 ) {
                gl.disable( gl.DEPTH_TEST );
            } else {
                gl.enable( gl.DEPTH_TEST );
                gl.depthFunc( this._func );
                gl.depthMask( this._writeMask );
                gl.depthRange( this._near, this._far );
            }
        }
    } ), 'osg', 'Depth' );

    return Depth;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Matrix',
    'osg/Vec3'
], function ( Notify, Matrix, Vec3 ) {

    var EllipsoidModel = function () {
        this._radiusEquator = EllipsoidModel.WGS_84_RADIUS_EQUATOR;
        this._radiusPolar = EllipsoidModel.WGS_84_RADIUS_POLAR;
        this.computeCoefficients();
    };

    EllipsoidModel.WGS_84_RADIUS_EQUATOR = 6378137.0;
    EllipsoidModel.WGS_84_RADIUS_POLAR = 6356752.3142;

    EllipsoidModel.prototype = {
        setRadiusEquator: function ( radius ) {
            this._radiusEquator = radius;
            this.computeCoefficients();
        },
        getRadiusEquator: function () {
            return this._radiusEquator;
        },
        setRadiusPolar: function ( radius ) {
            this._radiusPolar = radius;
            this.computeCoefficients();
        },
        getRadiusPolar: function () {
            return this._radiusPolar;
        },
        convertLatLongHeightToXYZ: function ( latitude, longitude, height, result ) {
            if ( result === undefined ) {
                Notify.warn( 'deprecated, use this signature convertLatLongHeightToXYZ( latitude, longitude, height, result )' );
                result = [];
            }
            var sin_latitude = Math.sin( latitude );
            var cos_latitude = Math.cos( latitude );
            var N = this._radiusEquator / Math.sqrt( 1.0 - this._eccentricitySquared * sin_latitude * sin_latitude );
            var X = ( N + height ) * cos_latitude * Math.cos( longitude );
            var Y = ( N + height ) * cos_latitude * Math.sin( longitude );
            var Z = ( N * ( 1 - this._eccentricitySquared ) + height ) * sin_latitude;
            result[ 0 ] = X;
            result[ 1 ] = Y;
            result[ 2 ] = Z;
            return result;
        },
        convertXYZToLatLongHeight: function ( X, Y, Z, result ) {
            if ( result === undefined ) {
                Notify.warn( 'deprecated, use this signature convertXYZToLatLongHeight( X,  Y,  Z , result)' );
                result = [];
            }
            // http://www.colorado.edu/geography/gcraft/notes/datum/gif/xyzllh.gif
            var p = Math.sqrt( X * X + Y * Y );
            var theta = Math.atan2( Z * this._radiusEquator, ( p * this._radiusPolar ) );
            var eDashSquared = ( this._radiusEquator * this._radiusEquator - this._radiusPolar * this._radiusPolar ) / ( this._radiusPolar * this._radiusPolar );

            var sin_theta = Math.sin( theta );
            var cos_theta = Math.cos( theta );

            latitude = Math.atan( ( Z + eDashSquared * this._radiusPolar * sin_theta * sin_theta * sin_theta ) /
                ( p - this._eccentricitySquared * this._radiusEquator * cos_theta * cos_theta * cos_theta ) );
            longitude = Math.atan2( Y, X );

            var sin_latitude = Math.sin( latitude );
            var N = this._radiusEquator / Math.sqrt( 1.0 - this._eccentricitySquared * sin_latitude * sin_latitude );

            height = p / Math.cos( latitude ) - N;
            result[ 0 ] = latitude;
            result[ 1 ] = longitude;
            result[ 2 ] = height;
            return result;
        },
        computeLocalUpVector: function ( X, Y, Z ) {
            // Note latitude is angle between normal to ellipsoid surface and XY-plane
            var latitude, longitude, altitude;
            var coord = this.convertXYZToLatLongHeight( X, Y, Z, latitude, longitude, altitude );
            latitude = coord[ 0 ];
            longitude = coord[ 1 ];
            altitude = coord[ 2 ];

            // Compute up vector
            return [ Math.cos( longitude ) * Math.cos( latitude ),
                Math.sin( longitude ) * Math.cos( latitude ),
                Math.sin( latitude ) ];
        },
        isWGS84: function () {
            return ( this._radiusEquator == EllipsoidModel.WGS_84_RADIUS_EQUATOR && this._radiusPolar == EllipsoidModel.WGS_84_RADIUS_POLAR );
        },

        computeCoefficients: function () {
            var flattening = ( this._radiusEquator - this._radiusPolar ) / this._radiusEquator;
            this._eccentricitySquared = 2 * flattening - flattening * flattening;
        },
        computeLocalToWorldTransformFromLatLongHeight: function ( latitude, longitude, height, result ) {
            if ( result === undefined ) {
                Notify.warn( 'deprecated, use this signature computeLocalToWorldTransformFromLatLongHeight(latitude, longitude, height, result)' );
                result = new Array( 16 );
            }
            var pos = this.convertLatLongHeightToXYZ( latitude, longitude, height, result );
            var m = Matrix.makeTranslate( pos[ 0 ], pos[ 1 ], pos[ 2 ], result );
            this.computeCoordinateFrame( latitude, longitude, result );
            return result;
        },
        computeLocalToWorldTransformFromXYZ: function ( X, Y, Z ) {
            var lla = this.convertXYZToLatLongHeight( X, Y, Z );
            var m = Matrix.makeTranslate( X, Y, Z );
            this.computeCoordinateFrame( lla[ 0 ], lla[ 1 ], m );
            return m;
        },
        computeCoordinateFrame: function ( latitude, longitude, localToWorld ) {
            // Compute up vector
            var up = [ Math.cos( longitude ) * Math.cos( latitude ), Math.sin( longitude ) * Math.cos( latitude ), Math.sin( latitude ) ];

            // Compute east vector
            var east = [ -Math.sin( longitude ), Math.cos( longitude ), 0 ];

            // Compute north vector = outer product up x east
            var north = Vec3.cross( up, east, [] );

            // set matrix
            Matrix.set( localToWorld, 0, 0, east[ 0 ] );
            Matrix.set( localToWorld, 0, 1, east[ 1 ] );
            Matrix.set( localToWorld, 0, 2, east[ 2 ] );

            Matrix.set( localToWorld, 1, 0, north[ 0 ] );
            Matrix.set( localToWorld, 1, 1, north[ 1 ] );
            Matrix.set( localToWorld, 1, 2, north[ 2 ] );

            Matrix.set( localToWorld, 2, 0, up[ 0 ] );
            Matrix.set( localToWorld, 2, 1, up[ 1 ] );
            Matrix.set( localToWorld, 2, 2, up[ 2 ] );
        }
    };

    return EllipsoidModel;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/StateAttribute'
], function ( Notify, MACROUTILS, StateAttribute ) {

    /** 
     * FrameBufferObject manage fbo / rtt
     * @class FrameBufferObject
     */
    var FrameBufferObject = function () {
        StateAttribute.call( this );
        this.fbo = undefined;
        this.attachments = [];
        this.dirty();
    };

    FrameBufferObject.COLOR_ATTACHMENT0 = 0x8CE0;
    FrameBufferObject.DEPTH_ATTACHMENT = 0x8D00;
    FrameBufferObject.DEPTH_COMPONENT16 = 0x81A5;

    /** @lends FrameBufferObject.prototype */
    FrameBufferObject.prototype = MACROUTILS.objectInehrit( StateAttribute.prototype, {
        attributeType: 'FrameBufferObject',
        cloneType: function () {
            return new FrameBufferObject();
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType;
        },
        setAttachment: function ( attachment ) {
            this.attachments.push( attachment );
        },
        _reportFrameBufferError: function ( code ) {
            switch ( code ) {
            case 0x8CD6:
                Notify.debug( 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT' );
                break;
            case 0x8CD7:
                Notify.debug( 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT' );
                break;
            case 0x8CD9:
                Notify.debug( 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS' );
                break;
            case 0x8CDD:
                Notifiy.debug( 'FRAMEBUFFER_UNSUPPORTED' );
                break;
            default:
                Notify.debug( 'FRAMEBUFFER unknown error ' + code.toString( 16 ) );
            }
        },
        apply: function ( state ) {
            var gl = state.getGraphicContext();
            var status;
            if ( this.attachments.length > 0 ) {
                if ( this.isDirty() ) {

                    if ( !this.fbo ) {
                        this.fbo = gl.createFramebuffer();
                    }

                    gl.bindFramebuffer( gl.FRAMEBUFFER, this.fbo );
                    var hasRenderBuffer = false;
                    for ( var i = 0, l = this.attachments.length; i < l; ++i ) {

                        if ( this.attachments[ i ].texture === undefined ) { // render buffer
                            var rb = gl.createRenderbuffer();
                            gl.bindRenderbuffer( gl.RENDERBUFFER, rb );
                            gl.renderbufferStorage( gl.RENDERBUFFER, this.attachments[ i ].format, this.attachments[ i ].width, this.attachments[ i ].height );
                            gl.framebufferRenderbuffer( gl.FRAMEBUFFER, this.attachments[ i ].attachment, gl.RENDERBUFFER, rb );
                            hasRenderBuffer = true;
                        } else {
                            var texture = this.attachments[ i ].texture;
                            // apply on unit 0 to init it
                            state.applyTextureAttribute( 0, texture );

                            //gl.framebufferTexture2D(gl.FRAMEBUFFER, this.attachments[i].attachment, texture.getTextureTarget(), texture.getTextureObject(), this.attachments[i].level);
                            gl.framebufferTexture2D( gl.FRAMEBUFFER, this.attachments[ i ].attachment, texture.getTextureTarget(), texture.getTextureObject(), this.attachments[ i ].level );
                        }
                    }
                    status = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
                    if ( status !== 0x8CD5 ) {
                        this._reportFrameBufferError( status );
                    }

                    if ( hasRenderBuffer ) { // set it to null only if used renderbuffer
                        gl.bindRenderbuffer( gl.RENDERBUFFER, null );
                    }
                    this.setDirty( false );
                } else {
                    gl.bindFramebuffer( gl.FRAMEBUFFER, this.fbo );
                    if ( Notify.reportWebGLError === true ) {
                        status = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
                        if ( status !== 0x8CD5 ) {
                            this._reportFrameBufferError( status );
                        }
                    }
                }
            } else {
                gl.bindFramebuffer( gl.FRAMEBUFFER, null );
            }
        }
    } );

    return FrameBufferObject;
} );
/*global define */

define( [], function () {

    var FrameStamp = function () {
        var frame = 0;
        var startSimulation = 0.0;
        var currentSimulation = 0.0;

        this.setReferenceTime = function ( s ) {
            startSimulation = s;
        };
        this.setSimulationTime = function ( s ) {
            currentSimulation = s;
        };
        this.getReferenceTime = function () {
            return startSimulation;
        };
        this.getSimulationTime = function () {
            return currentSimulation;
        };
        this.setFrameNumber = function ( n ) {
            frame = n;
        };
        this.getFrameNumber = function () {
            return frame;
        };
    };

    return FrameStamp;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Node',
    'osg/BoundingBox'
], function ( MACROUTILS, Node, BoundingBox ) {

    /** -*- compile-command: 'jslint-cli Geometry.js' -*- */

    /**
     * Geometry manage array and primitives to draw a geometry.
     * @class Geometry
     */
    var Geometry = function () {
        Node.call( this );
        this.primitives = [];
        this.attributes = {};
        this.boundingBox = new BoundingBox();
        this.boundingBoxComputed = false;
        this.cacheAttributeList = {};
    };

    /** @lends Geometry.prototype */
    Geometry.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( Node.prototype, {
        releaseGLObjects: function ( gl ) {
            var i;
            for ( i in this.attributes ) {
                this.attributes[ i ].releaseGLObjects( gl );
            }
            for ( var j = 0, l = this.primitives.length; j < l; j++ ) {
                var prim = this.primitives[ j ];
                if ( prim.getIndices !== undefined ) {
                    if ( prim.getIndices() !== undefined && prim.getIndices() !== null ) {
                        prim.indices.releaseGLObjects( gl );
                    }
                }
            }
        },
        dirtyBound: function () {
            if ( this.boundingBoxComputed === true ) {
                this.boundingBoxComputed = false;
            }
            Node.prototype.dirtyBound.call( this );
        },

        dirty: function () {
            this.cacheAttributeList = {};
        },
        getPrimitives: function () {
            return this.primitives;
        },
        getAttributes: function () {
            return this.attributes;
        },
        getVertexAttributeList: function () {
            return this.attributes;
        },
        getPrimitiveSetList: function () {
            return this.primitives;
        },

        drawImplementation: function ( state ) {
            var program = state.getLastProgramApplied();
            var prgID = program.getInstanceID();
            if ( this.cacheAttributeList[ prgID ] === undefined ) {
                var attribute;
                var attributesCache = program.attributesCache;
                var attributeList = [];

                var generated = '//generated by Geometry::implementation\n';
                generated += 'state.lazyDisablingOfVertexAttributes();\n';
                generated += 'var attr;\n';

                for ( var i = 0, l = attributesCache.attributeKeys.length; i < l; i++ ) {
                    var key = attributesCache.attributeKeys[ i ];
                    attribute = attributesCache[ key ];
                    var attr = this.attributes[ key ];
                    if ( attr === undefined ) {
                        continue;
                    }
                    attributeList.push( attribute );
                    // dont display the geometry if missing data
                    generated += 'attr = this.attributes[\'' + key + '\'];\n';
                    generated += 'if (!attr.isValid()) { return; }\n';
                    generated += 'state.setVertexAttribArray(' + attribute + ', attr, false);\n';
                }
                generated += 'state.applyDisablingOfVertexAttributes();\n';
                var primitives = this.primitives;
                generated += 'var primitives = this.primitives;\n';
                for ( var j = 0, m = primitives.length; j < m; ++j ) {
                    generated += 'primitives[' + j + '].draw(state);\n';
                }
                this.cacheAttributeList[ prgID ] = new Function( 'state', generated );
            }
            this.cacheAttributeList[ prgID ].call( this, state );
        },

        // for testing disabling drawing
        drawImplementationDummy: function ( state ) {
            var program = state.getLastProgramApplied();
            var attribute;
            var attributeList = [];
            var attributesCache = program.attributesCache;


            var primitives = this.primitives;
            //state.disableVertexAttribsExcept(attributeList);

            for ( var j = 0, m = primitives.length; j < m; ++j ) {
                //primitives[j].draw(state);
            }
        },

        getBoundingBox: function () {
            if ( !this.boundingBoxComputed ) {
                this.computeBoundingBox( this.boundingBox );
                this.boundingBoxComputed = true;
            }
            return this.boundingBox;
        },

        computeBoundingBox: function ( boundingBox ) {
            var vertexArray = this.getAttributes().Vertex;

            if ( vertexArray !== undefined &&
                vertexArray.getElements() !== undefined &&
                vertexArray.getItemSize() > 2 ) {
                var v = [ 0, 0, 0 ];
                vertexes = vertexArray.getElements();
                for ( var idx = 0, l = vertexes.length; idx < l; idx += 3 ) {
                    v[ 0 ] = vertexes[ idx ];
                    v[ 1 ] = vertexes[ idx + 1 ];
                    v[ 2 ] = vertexes[ idx + 2 ];
                    boundingBox.expandByVec3( v );
                }
            }
            return boundingBox;
        },

        computeBound: function ( boundingSphere ) {
            boundingSphere.init();
            var bb = this.getBoundingBox();
            boundingSphere.expandByBox( bb );
            return boundingSphere;
        }
    } ), 'osg', 'Geometry' );
    Geometry.prototype.objectType = MACROUTILS.objectType.generate( 'Geometry' );

    return Geometry;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/StateAttribute',
    'osg/Uniform',
    'osg/Matrix',
    'osg/Vec4',
    'osg/ShaderGenerator'
], function ( MACROUTILS, StateAttribute, Uniform, Matrix, Vec4, ShaderGenerator ) {

    /** -*- compile-command: 'jslint-cli Node.js' -*- */

    /** 
     *  Light
     *  @class Light
     */
    var Light = function ( lightNumber ) {
        StateAttribute.call( this );

        if ( lightNumber === undefined ) {
            lightNumber = 0;
        }

        this._ambient = [ 0.2, 0.2, 0.2, 1.0 ];
        this._diffuse = [ 0.8, 0.8, 0.8, 1.0 ];
        this._specular = [ 0.2, 0.2, 0.2, 1.0 ];
        this._position = [ 0.0, 0.0, 1.0, 0.0 ];
        this._direction = [ 0.0, 0.0, -1.0 ];
        this._spotCutoff = 180.0;
        this._spotBlend = 0.01;
        this._constantAttenuation = 1.0;
        this._linearAttenuation = 0.0;
        this._quadraticAttenuation = 0.0;
        this._lightUnit = lightNumber;
        this._enabled = 0;

        this.dirty();
    };

    /** @lends Light.prototype */
    Light.uniforms = {};
    Light.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {
        attributeType: 'Light',
        cloneType: function () {
            return new Light( this._lightUnit );
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType + this._lightUnit;
        },
        getOrCreateUniforms: function () {
            var uniforms = Light.uniforms;
            var typeMember = this.getTypeMember();
            if ( uniforms[ typeMember ] === undefined ) {
                var uFact = Uniform;
                uniforms[ typeMember ] = {
                    'ambient': uFact.createFloat4( [ 0.2, 0.2, 0.2, 1 ], this.getUniformName( 'ambient' ) ),
                    'diffuse': uFact.createFloat4( [ 0.8, 0.8, 0.8, 1 ], this.getUniformName( 'diffuse' ) ),
                    'specular': uFact.createFloat4( [ 0.2, 0.2, 0.2, 1 ], this.getUniformName( 'specular' ) ),
                    'position': uFact.createFloat4( [ 0, 0, 1, 0 ], this.getUniformName( 'position' ) ),
                    'direction': uFact.createFloat3( [ 0, 0, 1 ], this.getUniformName( 'direction' ) ),
                    'spotCutoff': uFact.createFloat1( 180.0, this.getUniformName( 'spotCutoff' ) ),
                    'spotBlend': uFact.createFloat1( 0.01, this.getUniformName( 'spotBlend' ) ),
                    'constantAttenuation': uFact.createFloat1( 0, this.getUniformName( 'constantAttenuation' ) ),
                    'linearAttenuation': uFact.createFloat1( 0, this.getUniformName( 'linearAttenuation' ) ),
                    'quadraticAttenuation': uFact.createFloat1( 0, this.getUniformName( 'quadraticAttenuation' ) ),
                    'enable': uFact.createInt1( 0, this.getUniformName( 'enable' ) ),
                    'matrix': uFact.createMatrix4( Matrix.makeIdentity( [] ), this.getUniformName( 'matrix' ) ),
                    'invMatrix': uFact.createMatrix4( Matrix.makeIdentity( [] ), this.getUniformName( 'invMatrix' ) )
                };

                uniforms[ typeMember ].uniformKeys = Object.keys( uniforms[ typeMember ] );
            }
            return uniforms[ typeMember ];
        },

        setPosition: function ( pos ) {
            Vec4.copy( pos, this._position );
        },
        getPosition: function () {
            return this._position;
        },

        setAmbient: function ( a ) {
            this._ambient = a;
            this.dirty();
        },
        setSpecular: function ( a ) {
            this._specular = a;
            this.dirty();
        },
        setDiffuse: function ( a ) {
            this._diffuse = a;
            this.dirty();
        },

        setSpotCutoff: function ( a ) {
            this._spotCutoff = a;
            this.dirty();
        },
        getSpotCutoff: function () {
            return this._spotCutoff;
        },

        setSpotBlend: function ( a ) {
            this._spotBlend = a;
            this.dirty();
        },
        getSpotBlend: function () {
            return this._spotBlend;
        },

        setConstantAttenuation: function ( value ) {
            this._constantAttenuation = value;
            this.dirty();
        },
        setLinearAttenuation: function ( value ) {
            this._linearAttenuation = value;
            this.dirty();
        },
        setQuadraticAttenuation: function ( value ) {
            this._quadraticAttenuation = value;
            this.dirty();
        },

        setDirection: function ( a ) {
            this._direction = a;
            this.dirty();
        },
        getDirection: function () {
            return this._direction;
        },

        setLightNumber: function ( unit ) {
            this._lightUnit = unit;
            this.dirty();
        },
        getLightNumber: function () {
            return this._lightUnit;
        },

        getPrefix: function () {
            return this.getType() + this._lightUnit;
        },
        getParameterName: function ( name ) {
            return this.getPrefix() + '_' + name;
        },
        getUniformName: function ( name ) {
            return this.getPrefix() + '_uniform_' + name;
        },

        applyPositionedUniform: function ( matrix, state ) {
            var uniform = this.getOrCreateUniforms();
            Matrix.copy( matrix, uniform.matrix.get() );
            uniform.matrix.dirty();

            Matrix.copy( matrix, uniform.invMatrix.get() );
            uniform.invMatrix.get()[ 12 ] = 0;
            uniform.invMatrix.get()[ 13 ] = 0;
            uniform.invMatrix.get()[ 14 ] = 0;
            Matrix.inverse( uniform.invMatrix.get(), uniform.invMatrix.get() );
            Matrix.transpose( uniform.invMatrix.get(), uniform.invMatrix.get() );
            uniform.invMatrix.dirty();
        },

        apply: function ( state ) {
            var light = this.getOrCreateUniforms();

            light.ambient.set( this._ambient );
            light.diffuse.set( this._diffuse );
            light.specular.set( this._specular );
            light.position.set( this._position );
            light.direction.set( this._direction );

            var spotsize = Math.cos( this._spotCutoff * Math.PI / 180.0 );
            light.spotCutoff.get()[ 0 ] = spotsize;
            light.spotCutoff.dirty();

            light.spotBlend.get()[ 0 ] = ( 1.0 - spotsize ) * this._spotBlend;
            light.spotBlend.dirty();

            light.constantAttenuation.get()[ 0 ] = this._constantAttenuation;
            light.constantAttenuation.dirty();

            light.linearAttenuation.get()[ 0 ] = this._linearAttenuation;
            light.linearAttenuation.dirty();

            light.quadraticAttenuation.get()[ 0 ] = this._quadraticAttenuation;
            light.quadraticAttenuation.dirty();

            //light._enable.set([this.enable]);

            this.setDirty( false );
        },


        _replace: function ( prefix, list, text, func ) {
            for ( var i = 0, l = list.length; i < l; i++ ) {
                var regex = new RegExp( prefix + list[ i ], 'g' );
                text = text.replace( regex, func.call( this, list[ i ] ) );
            }
            return text;
        },

        // will contain functions to generate shader
        _shader: {},
        _shaderCommon: {},

        generateShader: function ( type ) {
            if ( this._shader[ type ] ) {
                return this._shader[ type ].call( this );
            }
            return '';
        },

        generateShaderCommon: function ( type ) {
            if ( this._shaderCommon[ type ] ) {
                return this._shaderCommon[ type ].call( this );
            }
            return '';
        }


    } ), 'osg', 'Light' );


    // common shader generation functions
    Light.prototype._shaderCommon[ ShaderGenerator.Type.VertexInit ] = function () {
        return [ '',
            'varying vec3 FragNormal;',
            'varying vec3 FragEyeVector;',
            '',
            '' ].join( '\n' );
    };

    Light.prototype._shaderCommon[ ShaderGenerator.Type.VertexFunction ] = function () {
        return [ '',
            'vec3 computeNormal() {',
            '   return vec3(NormalMatrix * vec4(Normal, 0.0));',
            '}',
            '',
            'vec3 computeEyeVertex() {',
            '   return vec3(ModelViewMatrix * vec4(Vertex,1.0));',
            '}',
            '',
            '' ].join( '\n' );
    };

    Light.prototype._shaderCommon[ ShaderGenerator.Type.VertexMain ] = function () {
        return [ '',
            '  FragEyeVector = computeEyeVertex();',
            '  FragNormal = computeNormal();',
            '' ].join( '\n' );
    };

    Light.prototype._shaderCommon[ ShaderGenerator.Type.FragmentInit ] = function () {
        return [ 'varying vec3 FragNormal;',
            'varying vec3 FragEyeVector;',
            '' ].join( '\n' );
    };

    Light.prototype._shaderCommon[ ShaderGenerator.Type.FragmentFunction ] = function () {
        return [ '',
            'float getLightAttenuation(vec3 lightDir, float constant, float linear, float quadratic) {',
            '    ',
            '    float d = length(lightDir);',
            '    float att = 1.0 / ( constant + linear*d + quadratic*d*d);',
            '    return att;',
            '}',
            'vec4 computeLightContribution(vec4 materialAmbient,',
            '                              vec4 materialDiffuse,',
            '                              vec4 materialSpecular,',
            '                              float materialShininess,',
            '                              vec4 lightAmbient,',
            '                              vec4 lightDiffuse,',
            '                              vec4 lightSpecular,',
            '                              vec3 normal,',
            '                              vec3 eye,',
            '                              vec3 lightDirection,',
            '                              vec3 lightSpotDirection,',
            '                              float lightCosSpotCutoff,',
            '                              float lightSpotBlend,',
            '                              float lightAttenuation)',
            '{',
            '    vec3 L = lightDirection;',
            '    vec3 N = normal;',
            '    float NdotL = max(dot(L, N), 0.0);',
            '    float halfTerm = NdotL;',
            '    vec4 ambient = lightAmbient;',
            '    vec4 diffuse = vec4(0.0);',
            '    vec4 specular = vec4(0.0);',
            '    float spot = 0.0;',
            '',
            '    if (NdotL > 0.0) {',
            '        vec3 E = eye;',
            '        vec3 R = reflect(-L, N);',
            '        float RdotE = max(dot(R, E), 0.0);',
            '        if ( RdotE > 0.0) {',
            '           RdotE = pow( RdotE, materialShininess );',
            '        }',
            '        vec3 D = lightSpotDirection;',
            '        spot = 1.0;',
            '        if (lightCosSpotCutoff > 0.0) {',
            '          float cosCurAngle = dot(-L, D);',
            '          if (cosCurAngle < lightCosSpotCutoff) {',
            '             spot = 0.0;',
            '          } else {',
            '             if (lightSpotBlend > 0.0)',
            '               spot = cosCurAngle * smoothstep(0.0, 1.0, (cosCurAngle-lightCosSpotCutoff)/(lightSpotBlend));',
            '          }',
            '        }',

            '        diffuse = lightDiffuse * ((halfTerm));',
            '        specular = lightSpecular * RdotE;',
            '    }',
            '',
            '    return (materialAmbient*ambient + (materialDiffuse*diffuse + materialSpecular*specular) * spot) * lightAttenuation;',
            '}',
            'float linearrgb_to_srgb1(const in float c)',
            '{',
            '  float v = 0.0;',
            '  if(c < 0.0031308) {',
            '    if ( c > 0.0)',
            '      v = c * 12.92;',
            '  } else {',
            '    v = 1.055 * pow(c, 1.0/2.4) - 0.055;',
            '  }',
            '  return v;',
            '}',

            'vec4 linearrgb_to_srgb(const in vec4 col_from)',
            '{',
            '  vec4 col_to;',
            '  col_to.r = linearrgb_to_srgb1(col_from.r);',
            '  col_to.g = linearrgb_to_srgb1(col_from.g);',
            '  col_to.b = linearrgb_to_srgb1(col_from.b);',
            '  col_to.a = col_from.a;',
            '  return col_to;',
            '}',
            'float srgb_to_linearrgb1(const in float c)',
            '{',
            '  float v = 0.0;',
            '  if(c < 0.04045) {',
            '    if (c >= 0.0)',
            '      v = c * (1.0/12.92);',
            '  } else {',
            '    v = pow((c + 0.055)*(1.0/1.055), 2.4);',
            '  }',
            ' return v;',
            '}',
            'vec4 srgb2linear(const in vec4 col_from)',
            '{',
            '  vec4 col_to;',
            '  col_to.r = srgb_to_linearrgb1(col_from.r);',
            '  col_to.g = srgb_to_linearrgb1(col_from.g);',
            '  col_to.b = srgb_to_linearrgb1(col_from.b);',
            '  col_to.a = col_from.a;',
            '  return col_to;',
            '}',

            '' ].join( '\n' );
    };

    Light.prototype._shaderCommon[ ShaderGenerator.Type.FragmentMain ] = function () {
        return [ '',
            '  vec3 normal = normalize(FragNormal);',
            '  vec3 eyeVector = normalize(-FragEyeVector);',
            '  vec4 lightColor = MaterialEmission;',
            '' ].join( '\n' );
    };

    Light.prototype._shaderCommon[ ShaderGenerator.Type.FragmentEnd ] = function () {
        return [ '',
            '  fragColor *= lightColor;',
            '' ].join( '\n' );
    };


    // shader generation per instance of attribute
    Light.prototype._shader[ ShaderGenerator.Type.FragmentInit ] = function () {
        var str = [ '',
            'uniform vec4 Light_position;',
            'uniform vec3 Light_direction;',
            'uniform mat4 Light_matrix;',
            'uniform mat4 Light_invMatrix;',
            'uniform float Light_constantAttenuation;',
            'uniform float Light_linearAttenuation;',
            'uniform float Light_quadraticAttenuation;',
            'uniform vec4 Light_ambient;',
            'uniform vec4 Light_diffuse;',
            'uniform vec4 Light_specular;',
            'uniform float Light_spotCutoff;',
            'uniform float Light_spotBlend;',
            ''
        ].join( '\n' );

        // replace Light_xxxx by instance variable of 'this' light
        uniforms = Object.keys( this.getOrCreateUniforms() );
        str = this._replace( 'Light_', uniforms, str, this.getUniformName );
        return str;
    };

    Light.prototype._shader[ ShaderGenerator.Type.FragmentMain ] = function () {
        var str = [ '',
            '  vec3 lightEye = vec3(Light_matrix * Light_position);',
            '  vec3 lightDir;',
            '  if (Light_position[3] == 1.0) {',
            '    lightDir = lightEye - FragEyeVector;',
            '  } else {',
            '    lightDir = lightEye;',
            '  }',
            '  vec3 spotDirection = normalize(mat3(vec3(Light_invMatrix[0]), vec3(Light_invMatrix[1]), vec3(Light_invMatrix[2]))*Light_direction);',
            '  float attenuation = getLightAttenuation(lightDir, Light_constantAttenuation, Light_linearAttenuation, Light_quadraticAttenuation);',
            '  lightDir = normalize(lightDir);',
            '  lightColor += computeLightContribution(MaterialAmbient,',
            '                                         MaterialDiffuse, ',
            '                                         MaterialSpecular,',
            '                                         MaterialShininess,',
            '                                         Light_ambient,',
            '                                         Light_diffuse,',
            '                                         Light_specular,',
            '                                         normal,',
            '                                         eyeVector,',
            '                                         lightDir,',
            '                                         spotDirection,',
            '                                         Light_spotCutoff,',
            '                                         Light_spotBlend,',
            '                                         attenuation);',
            ''
        ].join( '\n' );

        var fields = [ 'lightEye',
            'lightDir',
            'spotDirection',
            'attenuation'
        ];
        str = this._replace( '', fields, str, this.getParameterName );
        uniforms = Object.keys( this.getOrCreateUniforms() );
        str = this._replace( 'Light_', uniforms, str, this.getUniformName );
        return str;
    };

    return Light;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Node',
], function ( MACROUTILS, Node ) {

    /** -*- compile-command: 'jslint-cli Node.js' -*- */

    /** 
     *  LightSource is a positioned node to use with StateAttribute Light
     *  @class LightSource
     */
    var LightSource = function () {
        Node.call( this );
        this._light = undefined;
    };

    /** @lends LightSource.prototype */
    LightSource.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( Node.prototype, {
        getLight: function () {
            return this._light;
        },
        setLight: function ( light ) {
            this._light = light;
        }
    } ), 'osg', 'LightSource' );
    LightSource.prototype.objectType = MACROUTILS.objectType.generate( 'LightSource' );

    return LightSource;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/StateAttribute',
], function ( MACROUTILS, StateAttribute ) {

    var LineWidth = function ( lineWidth ) {
        StateAttribute.call( this );
        this.lineWidth = 1.0;
        if ( lineWidth !== undefined ) {
            this.lineWidth = lineWidth;
        }
    };
    LineWidth.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {
        attributeType: 'LineWidth',
        cloneType: function () {
            return new LineWidth();
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType;
        },
        apply: function ( state ) {
            state.getGraphicContext().lineWidth( this.lineWidth );
        }
    } ), 'osg', 'LineWidth' );

    return LineWidth;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/StateAttribute',
    'osg/Vec4',
    'osg/Uniform',
    'osg/ShaderGenerator'
], function ( MACROUTILS, StateAttribute, Vec4, Uniform, ShaderGenerator ) {

    /** 
     * Material
     * @class Material
     */
    var Material = function () {
        StateAttribute.call( this );
        this.ambient = [ 0.2, 0.2, 0.2, 1.0 ];
        this.diffuse = [ 0.8, 0.8, 0.8, 1.0 ];
        this.specular = [ 0.0, 0.0, 0.0, 1.0 ];
        this.emission = [ 0.0, 0.0, 0.0, 1.0 ];
        this.shininess = 12.5;
    };
    /** @lends Material.prototype */
    Material.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {
        setEmission: function ( a ) {
            Vec4.copy( a, this.emission );
            this._dirty = true;
        },
        setAmbient: function ( a ) {
            Vec4.copy( a, this.ambient );
            this._dirty = true;
        },
        setSpecular: function ( a ) {
            Vec4.copy( a, this.specular );
            this._dirty = true;
        },
        setDiffuse: function ( a ) {
            Vec4.copy( a, this.diffuse );
            this._dirty = true;
        },
        setShininess: function ( a ) {
            this.shininess = a;
            this._dirty = true;
        },

        getEmission: function () {
            return this.emission;
        },
        getAmbient: function () {
            return this.ambient;
        },
        getSpecular: function () {
            return this.specular;
        },
        getDiffuse: function () {
            return this.diffuse;
        },
        getShininess: function () {
            return this.shininess;
        },

        attributeType: 'Material',
        cloneType: function () {
            return new Material();
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType;
        },
        getOrCreateUniforms: function () {
            if ( Material.uniforms === undefined ) {
                Material.uniforms = {
                    'ambient': Uniform.createFloat4( [ 0, 0, 0, 0 ], 'MaterialAmbient' ),
                    'diffuse': Uniform.createFloat4( [ 0, 0, 0, 0 ], 'MaterialDiffuse' ),
                    'specular': Uniform.createFloat4( [ 0, 0, 0, 0 ], 'MaterialSpecular' ),
                    'emission': Uniform.createFloat4( [ 0, 0, 0, 0 ], 'MaterialEmission' ),
                    'shininess': Uniform.createFloat1( [ 0 ], 'MaterialShininess' )
                };
                var uniformKeys = [];
                for ( var k in Material.uniforms ) {
                    uniformKeys.push( k );
                }
                Material.uniforms.uniformKeys = uniformKeys;
            }
            return Material.uniforms;
        },

        apply: function ( state ) {
            var uniforms = this.getOrCreateUniforms();
            uniforms.ambient.set( this.ambient );
            uniforms.diffuse.set( this.diffuse );
            uniforms.specular.set( this.specular );
            uniforms.emission.set( this.emission );
            uniforms.shininess.set( [ this.shininess ] );
            this._dirty = false;
        },


        // will contain functions to generate shader
        _shader: {},
        _shaderCommon: {},

        generateShader: function ( type ) {
            if ( this._shader[ type ] ) {
                return this._shader[ type ].call( this );
            }
            return '';
        }

    } ), 'osg', 'Material' );


    Material.prototype._shader[ ShaderGenerator.Type.VertexInit ] = function () {
        var str = [ 'uniform vec4 MaterialAmbient;',
            'uniform vec4 MaterialDiffuse;',
            'uniform vec4 MaterialSpecular;',
            'uniform vec4 MaterialEmission;',
            'uniform float MaterialShininess;',
            ''
        ].join( '\n' );
        return str;
    };

    Material.prototype._shader[ ShaderGenerator.Type.FragmentInit ] = function () {
        var str = [ 'uniform vec4 MaterialAmbient;',
            'uniform vec4 MaterialDiffuse;',
            'uniform vec4 MaterialSpecular;',
            'uniform vec4 MaterialEmission;',
            'uniform float MaterialShininess;',
            ''
        ].join( '\n' );
        return str;
    };

    return Material;
} );
/*global define */

define( [], function () {

    var PrimitiveSet = {};
    PrimitiveSet.POINTS = 0x0000;
    PrimitiveSet.LINES = 0x0001;
    PrimitiveSet.LINE_LOOP = 0x0002;
    PrimitiveSet.LINE_STRIP = 0x0003;
    PrimitiveSet.TRIANGLES = 0x0004;
    PrimitiveSet.TRIANGLE_STRIP = 0x0005;
    PrimitiveSet.TRIANGLE_FAN = 0x0006;

    return PrimitiveSet;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/StateAttribute'
], function ( Notify, MACROUTILS, StateAttribute ) {

    /**
     * Program encapsulate an vertex and fragment shader
     * @class Program
     */
    var Program = function ( vShader, fShader ) {
        StateAttribute.call( this );

        this.program = null;
        this.setVertexShader( vShader );
        this.setFragmentShader( fShader );
        this.dirty = true;
    };

    /** @lends Program.prototype */
    Program.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {

        attributeType: 'Program',
        cloneType: function () {
            var p = new Program();
            p.default_program = true;
            return p;
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType;
        },
        setVertexShader: function ( vs ) {
            this.vertex = vs;
        },
        setFragmentShader: function ( fs ) {
            this.fragment = fs;
        },
        getVertexShader: function () {
            return this.vertex;
        },
        getFragmentShader: function () {
            return this.fragment;
        },
        apply: function ( state ) {
            if ( !this.program || this.isDirty() ) {

                if ( this.default_program === true ) {
                    return;
                }

                if ( !this.vertex.shader ) {
                    this.vertex.compile();
                }
                if ( !this.fragment.shader ) {
                    this.fragment.compile();
                }
                this.program = gl.createProgram();
                gl.attachShader( this.program, this.vertex.shader );
                gl.attachShader( this.program, this.fragment.shader );
                gl.linkProgram( this.program );
                gl.validateProgram( this.program );
                if ( !gl.getProgramParameter( this.program, gl.LINK_STATUS ) && !gl.isContextLost() ) {
                    Notify.log( 'can\'t link program\n' + 'vertex shader:\n' + this.vertex.text + '\n fragment shader:\n' + this.fragment.text );
                    Notify.log( gl.getProgramInfoLog( this.program ) );
                    this.setDirty( false );
                    //debugger;
                    return null;
                }

                this.uniformsCache = {};
                this.uniformsCache.uniformKeys = [];
                this.attributesCache = {};
                this.attributesCache.attributeKeys = [];

                this.cacheUniformList( this.vertex.text );
                this.cacheUniformList( this.fragment.text );
                //Notify.log(this.uniformsCache);

                this.cacheAttributeList( this.vertex.text );

                this.setDirty( false );
            }

            gl.useProgram( this.program );
        },

        cacheUniformList: function ( str ) {
            var r = str.match( /uniform\s+\w+\s+\w+/g );
            if ( r !== null ) {
                for ( var i = 0, l = r.length; i < l; i++ ) {
                    var uniform = r[ i ].match( /uniform\s+\w+\s+(\w+)/ )[ 1 ];
                    var location = gl.getUniformLocation( this.program, uniform );
                    if ( location !== undefined && location !== null ) {
                        if ( this.uniformsCache[ uniform ] === undefined ) {
                            this.uniformsCache[ uniform ] = location;
                            this.uniformsCache.uniformKeys.push( uniform );
                        }
                    }
                }
            }
        },

        cacheAttributeList: function ( str ) {
            var r = str.match( /attribute\s+\w+\s+\w+/g );
            if ( r !== null ) {
                for ( var i = 0, l = r.length; i < l; i++ ) {
                    var attr = r[ i ].match( /attribute\s+\w+\s+(\w+)/ )[ 1 ];
                    var location = gl.getAttribLocation( this.program, attr );
                    if ( location !== -1 && location !== undefined ) {
                        if ( this.attributesCache[ attr ] === undefined ) {
                            this.attributesCache[ attr ] = location;
                            this.attributesCache.attributeKeys.push( attr );
                        }
                    }
                }
            }
        }
    } ), 'osg', 'Program' );

    Program.create = function ( vShader, fShader ) {
        console.log( 'Program.create is deprecated use new Program(vertex, fragment) instead' );
        var program = new Program( vShader, fShader );
        return program;
    };

    return Program;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Node',
    'osg/Matrix'
], function ( MACROUTILS, Node, Matrix ) {

    var Projection = function () {
        Node.call( this );
        this.projection = Matrix.makeIdentity( [] );
    };
    Projection.prototype = MACROUTILS.objectInehrit( Node.prototype, {
        getProjectionMatrix: function () {
            return this.projection;
        },
        setProjectionMatrix: function ( m ) {
            this.projection = m;
        }
    } );
    Projection.prototype.objectType = MACROUTILS.objectType.generate( 'Projection' );

    return Projection;
} );
/*global define */

define( [], function () {

    /** @class Quaternion Operations */
    var Quat = {
        copy: function ( s, d ) {
            d[ 0 ] = s[ 0 ];
            d[ 1 ] = s[ 1 ];
            d[ 2 ] = s[ 2 ];
            d[ 3 ] = s[ 3 ];
            return d;
        },
        makeIdentity: function ( element ) {
            return Quat.init( element );
        },
        zeroRotation: function ( element ) {
            return Quat.init( element );
        },

        init: function ( element ) {
            element[ 0 ] = 0;
            element[ 1 ] = 0;
            element[ 2 ] = 0;
            element[ 3 ] = 1;
            return element;
        },

        sub: function ( a, b, result ) {
            result[ 0 ] = a[ 0 ] - b[ 0 ];
            result[ 1 ] = a[ 1 ] - b[ 1 ];
            result[ 2 ] = a[ 2 ] - b[ 2 ];
            result[ 3 ] = a[ 3 ] - b[ 3 ];
            return result;
        },

        add: function ( a, b, result ) {
            result[ 0 ] = a[ 0 ] + b[ 0 ];
            result[ 1 ] = a[ 1 ] + b[ 1 ];
            result[ 2 ] = a[ 2 ] + b[ 2 ];
            result[ 3 ] = a[ 3 ] + b[ 3 ];
            return result;
        },

        dot: function ( a, b ) {
            return a[ 0 ] * b[ 0 ] + a[ 1 ] * b[ 1 ] + a[ 2 ] * b[ 2 ] + a[ 3 ] * b[ 3 ];
        },

        length2: function ( a ) {
            return a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ] + a[ 2 ] * a[ 2 ] + a[ 3 ] * a[ 3 ];
        },

        neg: function ( a, result ) {
            result[ 0 ] = -a[ 0 ];
            result[ 1 ] = -a[ 1 ];
            result[ 2 ] = -a[ 2 ];
            result[ 3 ] = -a[ 3 ];
            return result;
        },

        makeRotate: function ( angle, x, y, z, result ) {
            var epsilon = 0.0000001;
            var length = Math.sqrt( x * x + y * y + z * z );
            if ( length < epsilon ) {
                return this.init();
            }

            var inversenorm = 1.0 / length;
            var coshalfangle = Math.cos( 0.5 * angle );
            var sinhalfangle = Math.sin( 0.5 * angle );

            if ( result === undefined ) {
                result = [];
            }
            result[ 0 ] = x * sinhalfangle * inversenorm;
            result[ 1 ] = y * sinhalfangle * inversenorm;
            result[ 2 ] = z * sinhalfangle * inversenorm;
            result[ 3 ] = coshalfangle;
            return result;
        },

        lerp: function ( t, a, b, r ) {
            r[ 0 ] = a[ 0 ] + ( b[ 0 ] - a[ 0 ] ) * t;
            r[ 1 ] = a[ 1 ] + ( b[ 1 ] - a[ 1 ] ) * t;
            r[ 2 ] = a[ 2 ] + ( b[ 2 ] - a[ 2 ] ) * t;
            r[ 3 ] = a[ 3 ] + ( b[ 3 ] - a[ 3 ] ) * t;
            return r;
        },

        slerp: function ( t, from, to, result ) {
            var epsilon = 0.00001;

            var quatTo = to;
            var cosomega = this.dot( from, quatTo );
            if ( cosomega < 0.0 ) {
                cosomega = -cosomega;
                this.neg( to, quatTo );
            }

            var omega;
            var sinomega;
            var scale_from;
            var scale_to;
            if ( ( 1.0 - cosomega ) > epsilon ) {
                omega = Math.acos( cosomega ); // 0 <= omega <= Pi (see man acos)
                sinomega = Math.sin( omega ); // this sinomega should always be +ve so
                // could try sinomega=sqrt(1-cosomega*cosomega) to avoid a sin()?
                scale_from = Math.sin( ( 1.0 - t ) * omega ) / sinomega;
                scale_to = Math.sin( t * omega ) / sinomega;
            } else {
                /* --------------------------------------------------
             The ends of the vectors are very close
             we can use simple linear interpolation - no need
             to worry about the 'spherical' interpolation
             -------------------------------------------------- */
                scale_from = 1.0 - t;
                scale_to = t;
            }

            result[ 0 ] = from[ 0 ] * scale_from + quatTo[ 0 ] * scale_to;
            result[ 1 ] = from[ 1 ] * scale_from + quatTo[ 1 ] * scale_to;
            result[ 2 ] = from[ 2 ] * scale_from + quatTo[ 2 ] * scale_to;
            result[ 3 ] = from[ 3 ] * scale_from + quatTo[ 3 ] * scale_to;
            return result;
        },

        // transformVec3: function (q, vec, result) {
        //     // nVidia SDK implementation
        //     var uv = new Array(3);
        //     var uuv = new Array(3);
        //     Vec3.cross(q, vec, uv);
        //     Vec3.cross(q, uv, result);
        //     Vec3.mult(uv, 2.0 * q[3], uv);
        //     Vec3.mult(result, 2.0, result);
        //     Vec3.add(result, uv, result);
        //     Vec3.add(result, vec, result);
        //     return result;
        // },

        normalize: function ( q, qr ) {
            var div = 1.0 / this.length2( q );
            qr[ 0 ] = q[ 0 ] * div;
            qr[ 1 ] = q[ 1 ] * div;
            qr[ 2 ] = q[ 2 ] * div;
            qr[ 3 ] = q[ 3 ] * div;
            return qr;
        },

        // we suppose to have unit quaternion
        conj: function ( a, result ) {
            result[ 0 ] = -a[ 0 ];
            result[ 1 ] = -a[ 1 ];
            result[ 2 ] = -a[ 2 ];
            result[ 3 ] = a[ 3 ];
            return result;
        },

        inverse: function ( a, result ) {
            var div = 1.0 / this.length2( a );
            this.conj( a, result );
            result[ 0 ] *= div;
            result[ 1 ] *= div;
            result[ 2 ] *= div;
            result[ 3 ] *= div;
            return result;
        },

        // we suppose to have unit quaternion
        // multiply 2 quaternions
        mult: function ( a, b, result ) {
            result[ 0 ] = a[ 0 ] * b[ 3 ] + a[ 1 ] * b[ 2 ] - a[ 2 ] * b[ 1 ] + a[ 3 ] * b[ 0 ];
            result[ 1 ] = -a[ 0 ] * b[ 2 ] + a[ 1 ] * b[ 3 ] + a[ 2 ] * b[ 0 ] + a[ 3 ] * b[ 1 ];
            result[ 2 ] = a[ 0 ] * b[ 1 ] - a[ 1 ] * b[ 0 ] + a[ 2 ] * b[ 3 ] + a[ 3 ] * b[ 2 ];
            result[ 3 ] = -a[ 0 ] * b[ 0 ] - a[ 1 ] * b[ 1 ] - a[ 2 ] * b[ 2 ] + a[ 3 ] * b[ 3 ];
            return result;
        },
        div: function ( a, b, result ) {
            var d = 1.0 / b;
            result[ 0 ] = a[ 0 ] * d;
            result[ 1 ] = a[ 1 ] * d;
            result[ 2 ] = a[ 2 ] * d;
            result[ 3 ] = a[ 3 ] * d;
            return result;
        },
        exp: function ( a, res ) {
            var r = Math.sqrt( a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ] + a[ 2 ] * a[ 2 ] );
            var et = Math.exp( a[ 3 ] );
            var s = 0;
            if ( r > 0.00001 ) {
                s = et * Math.sin( r ) / r;
            }
            if ( res === undefined ) {
                res = [];
            }
            res[ 0 ] = s * a[ 0 ];
            res[ 1 ] = s * a[ 1 ];
            res[ 2 ] = s * a[ 2 ];
            res[ 3 ] = et * Math.cos( r );
            return res;
        },

        ln: function ( a, res ) {
            var n = a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ] + a[ 2 ] * a[ 2 ];
            var r = Math.sqrt( n );
            var t = 0;
            if ( r > 0.00001 ) {
                t = Math.atan2( r, a[ 3 ] ) / r;
            }
            if ( res === undefined ) {
                res = [];
            }
            n += a[ 3 ] * a[ 3 ];
            res[ 0 ] = t * a[ 0 ];
            res[ 1 ] = t * a[ 1 ];
            res[ 2 ] = t * a[ 2 ];
            res[ 3 ] = 0.5 * Math.log( n );
            return res;
        },


        //http://theory.org/software/qfa/writeup/node12.html
        //http://www.ece.uwaterloo.ca/~dwharder/C++/CQOST/src/
        //http://willperone.net/Code/quaternion.php

        // a is computeTangent(q1-1,q1,q2)
        // b is computeTangent(q2-1,q2,q2+1)
        squad: function ( t, q1, a, b, q2, r ) {
            var r1 = this.slerp( t, q1, q2 );
            var r2 = this.slerp( t, a, b );
            return this.slerp( 2.0 * t * ( 1.0 - t ), r1, r2, r );
        },

        // qcur is current
        // q0 is qcur-1
        // q2 is qcur+1
        // compute tangent in of q1
        computeTangent: function ( q0, qcur, q2, r ) {

            // first step
            var invq = this.inv( qcur );
            var qa, qb;

            this.mult( q2, invq, qa );
            this.ln( qa, qa );

            this.mult( q0, invq, qb );
            this.ln( qb, qb );

            this.add( qa, qb, qa );
            this.div( qa, -4.0, qa );
            this.exp( qa, qb );
            return this.mult( qb, q1, r );
        }

    };

    return Quat;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/StateGraph',
    'osg/Matrix'
], function ( Notify, StateGraph, Matrix ) {

    var RenderBin = function () {
        this._leafs = [];
        this.positionedAttribute = [];
        this._renderStage = undefined;
        this._bins = {};
        this.stateGraphList = [];
        this._parent = undefined;
        this._binNum = 0;

        this._sorted = false;
        this._sortMode = RenderBin.SORT_BY_STATE;

    };
    RenderBin.SORT_BY_STATE = 0;
    RenderBin.SORT_BACK_TO_FRONT = 1;
    RenderBin.BinPrototypes = {
        RenderBin: function () {
            return new RenderBin();
        },
        DepthSortedBin: function () {
            var rb = new RenderBin();
            rb._sortMode = RenderBin.SORT_BACK_TO_FRONT;
            return rb;
        }
    };

    RenderBin.prototype = {
        _createRenderBin: function ( binName ) {
            if ( binName === undefined || RenderBin.BinPrototypes[ binName ] === undefined ) {
                return RenderBin.BinPrototypes.RenderBin();
            }
            return RenderBin.BinPrototypes[ binName ]();
        },
        getStateGraphList: function () {
            return this.stateGraphList;
        },
        copyLeavesFromStateGraphListToRenderLeafList: function () {

            this._leafs.splice( 0, this._leafs.length );
            var detectedNaN = false;

            for ( var i = 0, l = this.stateGraphList.length; i < l; i++ ) {
                var leafs = this.stateGraphList[ i ].leafs;
                for ( var j = 0, k = leafs.length; j < k; j++ ) {
                    var leaf = leafs[ j ];
                    if ( isNaN( leaf.depth ) ) {
                        detectedNaN = true;
                    } else {
                        this._leafs.push( leaf );
                    }
                }
            }

            if ( detectedNaN ) {
                Notify.debug( 'warning: RenderBin::copyLeavesFromStateGraphListToRenderLeafList() detected NaN depth values, database may be corrupted.' );
            }
            // empty the render graph list to prevent it being drawn along side the render leaf list (see drawImplementation.)
            this.stateGraphList.splice( 0, this.stateGraphList.length );
        },

        sortBackToFront: function () {
            this.copyLeavesFromStateGraphListToRenderLeafList();
            var cmp = function ( a, b ) {
                return b.depth - a.depth;
            };
            this._leafs.sort( cmp );
        },

        sortImplementation: function () {
            var SortMode = RenderBin;
            switch ( this._sortMode ) {
            case SortMode.SORT_BACK_TO_FRONT:
                this.sortBackToFront();
                break;
            case SortMode.SORT_BY_STATE:
                // do nothing
                break;
            }
        },

        sort: function () {
            if ( this._sorted ) {
                return;
            }

            var bins = this._bins;
            var keys = Object.keys( bins );
            for ( var i = 0, l = keys.length; i < l; i++ ) {
                bins[ keys[ i ] ].sort();
            }
            this.sortImplementation();

            _sorted = true;
        },

        setParent: function ( parent ) {
            this._parent = parent;
        },
        getParent: function () {
            return this._parent;
        },
        getBinNumber: function () {
            return this._binNum;
        },
        findOrInsert: function ( binNum, binName ) {
            var bin = this._bins[ binNum ];
            if ( bin === undefined ) {
                bin = this._createRenderBin( binName );
                bin._parent = this;
                bin._binNum = binNum;
                bin._renderStage = this._renderStage;
                this._bins[ binNum ] = bin;
            }
            return bin;
        },
        getStage: function () {
            return this._renderStage;
        },
        addStateGraph: function ( sg ) {
            this.stateGraphList.push( sg );
        },
        reset: function () {
            this.stateGraphList.length = 0;
            this._bins = {};
            this.positionedAttribute.length = 0;
            this._leafs.length = 0;
            this._sorted = false;
        },
        applyPositionedAttribute: function ( state, positionedAttibutes ) {
            // the idea is to set uniform 'globally' in uniform map.
            for ( var index = 0, l = positionedAttibutes.length; index < l; index++ ) {
                var element = positionedAttibutes[ index ];
                // add or set uniforms in state
                var stateAttribute = element[ 1 ];
                var matrix = element[ 0 ];
                state.setGlobalDefaultValue( stateAttribute );
                stateAttribute.apply( state );
                stateAttribute.applyPositionedUniform( matrix, state );
                state.haveAppliedAttribute( stateAttribute );
            }
        },

        drawImplementation: function ( state, previousRenderLeaf ) {
            var previous = previousRenderLeaf;
            var binsKeys = Object.keys( this._bins );
            var bins = this._bins;
            var binsArray = [];
            for ( var i = 0, l = binsKeys.length; i < l; i++ ) {
                var k = binsKeys[ i ];
                binsArray.push( bins[ k ] );
            }
            var cmp = function ( a, b ) {
                return a._binNum - b._binNum;
            };
            binsArray.sort( cmp );

            var current = 0;
            var end = binsArray.length;

            var bin;
            // draw pre bins
            for ( ; current < end; current++ ) {
                bin = binsArray[ current ];
                if ( bin.getBinNumber() > 0 ) {
                    break;
                }
                previous = bin.drawImplementation( state, previous );
            }

            // draw leafs
            previous = this.drawLeafs( state, previous );

            // draw post bins
            for ( ; current < end; current++ ) {
                bin = binsArray[ current ];
                previous = bin.drawImplementation( state, previous );
            }
            return previous;
        },

        drawLeafs: function ( state, previousRenderLeaf ) {

            var stateList = this.stateGraphList;
            var leafs = this._leafs;
            var normalUniform;
            var modelViewUniform;
            var projectionUniform;
            var program;
            var stateset;
            var previousLeaf = previousRenderLeaf;
            var normal = [];
            var normalTranspose = [];

            if ( previousLeaf ) {
                StateGraph.prototype.moveToRootStateGraph( state, previousRenderLeaf.parent );
            }

            var leaf, push;
            var prev_rg, prev_rg_parent, rg;

            // draw fine grained ordering.
            for ( var d = 0, dl = leafs.length; d < dl; d++ ) {
                leaf = leafs[ d ];
                push = false;
                if ( previousLeaf !== undefined ) {

                    // apply state if required.
                    prev_rg = previousLeaf.parent;
                    prev_rg_parent = prev_rg.parent;
                    rg = leaf.parent;
                    if ( prev_rg_parent !== rg.parent ) {
                        rg.moveStateGraph( state, prev_rg_parent, rg.parent );

                        // send state changes and matrix changes to OpenGL.
                        state.pushStateSet( rg.stateset );
                        push = true;
                    } else if ( rg !== prev_rg ) {
                        // send state changes and matrix changes to OpenGL.
                        state.pushStateSet( rg.stateset );
                        push = true;
                    }

                } else {
                    leaf.parent.moveStateGraph( state, undefined, leaf.parent.parent );
                    state.pushStateSet( leaf.parent.stateset );
                    push = true;
                }

                if ( push === true ) {
                    //state.pushGeneratedProgram();
                    state.apply();
                    program = state.getLastProgramApplied();

                    modelViewUniform = program.uniformsCache[ state.modelViewMatrix.name ];
                    projectionUniform = program.uniformsCache[ state.projectionMatrix.name ];
                    normalUniform = program.uniformsCache[ state.normalMatrix.name ];
                }


                if ( modelViewUniform !== undefined ) {
                    state.modelViewMatrix.set( leaf.modelview );
                    state.modelViewMatrix.apply( modelViewUniform );
                }
                if ( projectionUniform !== undefined ) {
                    state.projectionMatrix.set( leaf.projection );
                    state.projectionMatrix.apply( projectionUniform );
                }
                if ( normalUniform !== undefined ) {
                    Matrix.copy( leaf.modelview, normal );
                    //Matrix.setTrans(normal, 0, 0, 0);
                    normal[ 12 ] = 0;
                    normal[ 13 ] = 0;
                    normal[ 14 ] = 0;

                    Matrix.inverse( normal, normal );
                    Matrix.transpose( normal, normal );
                    state.normalMatrix.set( normal );
                    state.normalMatrix.apply( normalUniform );
                }

                leaf.geometry.drawImplementation( state );

                if ( push === true ) {
                    state.popGeneratedProgram();
                    state.popStateSet();
                }

                previousLeaf = leaf;
            }


            // draw coarse grained ordering.
            for ( var i = 0, l = stateList.length; i < l; i++ ) {
                var sg = stateList[ i ];
                for ( var j = 0, ll = sg.leafs.length; j < ll; j++ ) {

                    leaf = sg.leafs[ j ];
                    push = false;
                    if ( previousLeaf !== undefined ) {

                        // apply state if required.
                        prev_rg = previousLeaf.parent;
                        prev_rg_parent = prev_rg.parent;
                        rg = leaf.parent;
                        if ( prev_rg_parent !== rg.parent ) {
                            rg.moveStateGraph( state, prev_rg_parent, rg.parent );

                            // send state changes and matrix changes to OpenGL.
                            state.pushStateSet( rg.stateset );
                            push = true;
                        } else if ( rg !== prev_rg ) {
                            // send state changes and matrix changes to OpenGL.
                            state.pushStateSet( rg.stateset );
                            push = true;
                        }

                    } else {
                        leaf.parent.moveStateGraph( state, undefined, leaf.parent.parent );
                        state.pushStateSet( leaf.parent.stateset );
                        push = true;
                    }

                    if ( push === true ) {
                        //state.pushGeneratedProgram();
                        state.apply();
                        program = state.getLastProgramApplied();

                        modelViewUniform = program.uniformsCache[ state.modelViewMatrix.name ];
                        projectionUniform = program.uniformsCache[ state.projectionMatrix.name ];
                        normalUniform = program.uniformsCache[ state.normalMatrix.name ];
                    }


                    if ( modelViewUniform !== undefined ) {
                        state.modelViewMatrix.set( leaf.modelview );
                        state.modelViewMatrix.apply( modelViewUniform );
                    }
                    if ( projectionUniform !== undefined ) {
                        state.projectionMatrix.set( leaf.projection );
                        state.projectionMatrix.apply( projectionUniform );
                    }
                    if ( normalUniform !== undefined ) {
                        Matrix.copy( leaf.modelview, normal );
                        //Matrix.setTrans(normal, 0, 0, 0);
                        normal[ 12 ] = 0;
                        normal[ 13 ] = 0;
                        normal[ 14 ] = 0;

                        Matrix.inverse( normal, normal );
                        Matrix.transpose( normal, normal );
                        state.normalMatrix.set( normal );
                        state.normalMatrix.apply( normalUniform );
                    }

                    leaf.geometry.drawImplementation( state );

                    if ( push === true ) {
                        state.popGeneratedProgram();
                        state.popStateSet();
                    }

                    previousLeaf = leaf;
                }
            }
            return previousLeaf;
        }
    };

    return RenderBin;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/RenderBin',
    'osg/Camera',
    'osg/FrameBufferObject'
], function ( Notify, MACROUTILS, RenderBin, Camera, FrameBufferObject ) {

    /**
     * From OpenSceneGraph http://www.openscenegraph.org
     * RenderStage base class. Used for encapsulate a complete stage in
     * rendering - setting up of viewport, the projection and model
     * matrices and rendering the RenderBin's enclosed with this RenderStage.
     * RenderStage also has a dependency list of other RenderStages, each
     * of which must be called before the rendering of this stage.  These
     * 'pre' rendering stages are used for advanced rendering techniques
     * like multistage pixel shading or impostors.
     */
    var RenderStage = function () {
        RenderBin.call( this );
        this.positionedAttribute = [];
        this.clearDepth = 1.0;
        this.clearColor = [ 0, 0, 0, 1 ];
        this.clearMask = Camera.COLOR_BUFFER_BIT | Camera.DEPTH_BUFFER_BIT;
        this.camera = undefined;
        this.viewport = undefined;
        this.preRenderList = [];
        this.postRenderList = [];
        this._renderStage = this;
    };
    RenderStage.prototype = MACROUTILS.objectInehrit( RenderBin.prototype, {
        reset: function () {
            RenderBin.prototype.reset.call( this );
            this.preRenderList.length = 0;
            this.postRenderList.length = 0;
        },
        setClearDepth: function ( depth ) {
            this.clearDepth = depth;
        },
        getClearDepth: function () {
            return this.clearDepth;
        },
        setClearColor: function ( color ) {
            this.clearColor = color;
        },
        getClearColor: function () {
            return this.clearColor;
        },
        setClearMask: function ( mask ) {
            this.clearMask = mask;
        },
        getClearMask: function () {
            return this.clearMask;
        },
        setViewport: function ( vp ) {
            this.viewport = vp;
        },
        getViewport: function () {
            return this.viewport;
        },
        setCamera: function ( camera ) {
            this.camera = camera;
        },
        addPreRenderStage: function ( rs, order ) {
            for ( var i = 0, l = this.preRenderList.length; i < l; i++ ) {
                var render = this.preRenderList[ i ];
                if ( order < render.order ) {
                    break;
                }
            }
            if ( i < this.preRenderList.length ) {
                this.preRenderList = this.preRenderList.splice( i, 0, {
                    'order': order,
                    'renderStage': rs
                } );
            } else {
                this.preRenderList.push( {
                    'order': order,
                    'renderStage': rs
                } );
            }
        },
        addPostRenderStage: function ( rs, order ) {
            for ( var i = 0, l = this.postRenderList.length; i < l; i++ ) {
                var render = this.postRenderList[ i ];
                if ( order < render.order ) {
                    break;
                }
            }
            if ( i < this.postRenderList.length ) {
                this.postRenderList = this.postRenderList.splice( i, 0, {
                    'order': order,
                    'renderStage': rs
                } );
            } else {
                this.postRenderList.push( {
                    'order': order,
                    'renderStage': rs
                } );
            }
        },

        drawPreRenderStages: function ( state, previousRenderLeaf ) {
            var previous = previousRenderLeaf;
            for ( var i = 0, l = this.preRenderList.length; i < l; ++i ) {
                var sg = this.preRenderList[ i ].renderStage;
                previous = sg.draw( state, previous );
            }
            return previous;
        },

        draw: function ( state, previousRenderLeaf ) {
            var previous = this.drawPreRenderStages( state, previousRenderLeaf );
            previous = this.drawImplementation( state, previous );

            previous = this.drawPostRenderStages( state, previous );
            return previous;
        },

        sort: function () {
            for ( var i = 0, l = this.preRenderList.length; i < l; ++i ) {
                this.preRenderList[ i ].renderStage.sort();
            }

            RenderBin.prototype.sort.call( this );

            for ( var j = 0, k = this.postRenderList.length; i < l; ++i ) {
                this.postRenderList[ i ].renderStage.sort();
            }
        },

        drawPostRenderStages: function ( state, previousRenderLeaf ) {
            var previous = previousRenderLeaf;
            for ( var i = 0, l = this.postRenderList.length; i < l; ++i ) {
                var sg = this.postRenderList[ i ].renderStage;
                previous = sg.draw( state, previous );
            }
            return previous;
        },

        applyCamera: function ( state ) {
            var gl = state.getGraphicContext();
            if ( this.camera === undefined ) {
                gl.bindFramebuffer( gl.FRAMEBUFFER, null );
                return;
            }
            var viewport = this.camera.getViewport();
            var fbo = this.camera.frameBufferObject;

            if ( !fbo ) {
                fbo = new FrameBufferObject();
                this.camera.frameBufferObject = fbo;
            }

            if ( fbo.isDirty() ) {
                if ( this.camera.attachments !== undefined ) {
                    for ( var key in this.camera.attachments ) {
                        var a = this.camera.attachments[ key ];
                        var attach;
                        if ( a.texture === undefined ) { //renderbuffer
                            attach = {
                                attachment: key,
                                format: a.format,
                                width: viewport.width(),
                                height: viewport.height()
                            };
                        } else if ( a.texture !== undefined ) {
                            attach = {
                                attachment: key,
                                texture: a.texture,
                                level: a.level
                            };
                            if ( a.format ) {
                                attach.format = a.format;
                            }
                        }
                        fbo.setAttachment( attach );
                    }
                }
            }
            fbo.apply( state );
        },

        drawImplementation: function ( state, previousRenderLeaf ) {
            var error;
            var gl = state.getGraphicContext();

            this.applyCamera( state );

            if ( this.viewport === undefined ) {
                Notify.log( 'RenderStage does not have a valid viewport' );
            }

            state.applyAttribute( this.viewport );

            if ( this.clearMask & gl.COLOR_BUFFER_BIT ) {
                gl.clearColor( this.clearColor[ 0 ], this.clearColor[ 1 ], this.clearColor[ 2 ], this.clearColor[ 3 ] );
            }
            if ( this.clearMask & gl.DEPTH_BUFFER_BIT ) {
                gl.depthMask( true );
                gl.clearDepth( this.clearDepth );
            }
            gl.clear( this.clearMask );

            if ( this.positionedAttribute ) {
                this.applyPositionedAttribute( state, this.positionedAttribute );
            }

            var previous = RenderBin.prototype.drawImplementation.call( this, state, previousRenderLeaf );

            return previous;
        }
    } );

    return RenderStage;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Program',
    'osg/Shader'
], function ( Notify, Program, Shader ) {

    var ShaderGenerator = function () {
        this.cache = [];
    };

    ShaderGenerator.Type = {
        VertexInit: 0,
        VertexFunction: 1,
        VertexMain: 2,
        VertexEnd: 3,
        FragmentInit: 5,
        FragmentFunction: 6,
        FragmentMain: 7,
        FragmentEnd: 8
    };

    ShaderGenerator.prototype = {

        getActiveTypeMember: function ( state ) {
            // we should check attribute is active or not
            var types = [];
            for ( var j = 0, k = state.attributeMap.attributeKeys.length; j < k; j++ ) {
                var keya = state.attributeMap.attributeKeys[ j ];
                var attributeStack = state.attributeMap[ keya ];
                if ( attributeStack.length === 0 && attributeStack.globalDefault.applyPositionedUniform === undefined ) {
                    continue;
                }
                if ( attributeStack.globalDefault.getOrCreateUniforms !== undefined || attributeStack.globalDefault.writeToShader !== undefined ) {
                    types.push( keya );
                }
            }

            for ( var i = 0, l = state.textureAttributeMapList.length; i < l; i++ ) {
                var attributesForUnit = state.textureAttributeMapList[ i ];
                if ( attributesForUnit === undefined ) {
                    continue;
                }
                for ( var h = 0, m = attributesForUnit.attributeKeys.length; h < m; h++ ) {
                    var key = attributesForUnit.attributeKeys[ h ];
                    var textureAttributeStack = attributesForUnit[ key ];
                    if ( textureAttributeStack.length === 0 ) {
                        continue;
                    }
                    if ( textureAttributeStack.globalDefault.getOrCreateUniforms !== undefined || textureAttributeStack.globalDefault.writeToShader !== undefined ) {
                        types.push( key + i );
                    }
                }
            }
            return types;
        },

        getActiveAttributeMapKeys: function ( state ) {
            var keys = [];
            for ( var j = 0, k = state.attributeMap.attributeKeys.length; j < k; j++ ) {
                var keya = state.attributeMap.attributeKeys[ j ];
                var attributeStack = state.attributeMap[ keya ];
                if ( attributeStack.length === 0 && attributeStack.globalDefault.applyPositionedUniform === undefined ) {
                    continue;
                }
                if ( attributeStack.globalDefault.getOrCreateUniforms !== undefined || attributeStack.globalDefault.writeToShader !== undefined ) {
                    keys.push( keya );
                }
            }
            return keys;
        },

        getActiveTextureAttributeMapKeys: function ( state ) {
            var textureAttributeKeys = [];
            for ( var i = 0, l = state.textureAttributeMapList.length; i < l; i++ ) {
                var attributesForUnit = state.textureAttributeMapList[ i ];
                if ( attributesForUnit === undefined ) {
                    continue;
                }
                textureAttributeKeys[ i ] = [];
                for ( var j = 0, m = attributesForUnit.attributeKeys.length; j < m; j++ ) {
                    var key = attributesForUnit.attributeKeys[ j ];
                    var textureAttributeStack = attributesForUnit[ key ];
                    if ( textureAttributeStack.length === 0 ) {
                        continue;
                    }
                    if ( textureAttributeStack.globalDefault.getOrCreateUniforms !== undefined || textureAttributeStack.globalDefault.writeToShader !== undefined ) {
                        textureAttributeKeys[ i ].push( key );
                    }
                }
            }
            return textureAttributeKeys;
        },

        // getActiveUniforms
        // return the list of uniforms enabled from the State
        // The idea behind this is to generate a shader depending on attributes/uniforms enabled by the user
        getActiveUniforms: function ( state, attributeKeys, textureAttributeKeys ) {
            var uniforms = {};

            for ( var i = 0, l = attributeKeys.length; i < l; i++ ) {
                var key = attributeKeys[ i ];

                if ( state.attributeMap[ key ].globalDefault.getOrCreateUniforms === undefined ) {
                    continue;
                }
                var attributeUniforms = state.attributeMap[ key ].globalDefault.getOrCreateUniforms();
                for ( var j = 0, m = attributeUniforms.uniformKeys.length; j < m; j++ ) {
                    var name = attributeUniforms.uniformKeys[ j ];
                    var uniform = attributeUniforms[ name ];
                    uniforms[ uniform.name ] = uniform;
                }
            }

            for ( var a = 0, n = textureAttributeKeys.length; a < n; a++ ) {
                var unitAttributekeys = textureAttributeKeys[ a ];
                if ( unitAttributekeys === undefined ) {
                    continue;
                }
                for ( var b = 0, o = unitAttributekeys.length; b < o; b++ ) {
                    var attrName = unitAttributekeys[ b ];
                    //if (state.textureAttributeMapList[a][attrName].globalDefault === undefined) {
                    //debugger;
                    //}
                    var textureAttribute = state.textureAttributeMapList[ a ][ attrName ].globalDefault;
                    if ( textureAttribute.getOrCreateUniforms === undefined ) {
                        continue;
                    }
                    var texUniforms = textureAttribute.getOrCreateUniforms( a );
                    for ( var t = 0, tl = texUniforms.uniformKeys.length; t < tl; t++ ) {
                        var tname = texUniforms.uniformKeys[ t ];
                        var tuniform = texUniforms[ tname ];
                        uniforms[ tuniform.name ] = tuniform;
                    }
                }
            }

            var keys = [];
            for ( var ukey in uniforms ) {
                keys.push( ukey );
            }
            uniforms.uniformKeys = keys;
            return uniforms;
        },

        getOrCreateProgram: function ( state ) {

            // first get trace of active attribute and texture attributes to check
            // if we already have generated a program for this configuration
            var flattenKeys = this.getActiveTypeMember( state );
            for ( var i = 0, l = this.cache.length; i < l; ++i ) {
                if ( this.compareAttributeMap( flattenKeys, this.cache[ i ].flattenKeys ) === 0 ) {
                    return this.cache[ i ];
                }
            }

            // extract valid attributes keys with more details
            var attributeKeys = this.getActiveAttributeMapKeys( state );
            var textureAttributeKeys = this.getActiveTextureAttributeMapKeys( state );


            var vertexshader = this.getOrCreateVertexShader( state, attributeKeys, textureAttributeKeys );
            var fragmentshader = this.getOrCreateFragmentShader( state, attributeKeys, textureAttributeKeys );
            var program = new Program(
                new Shader( gl.VERTEX_SHADER, vertexshader ),
                new Shader( gl.FRAGMENT_SHADER, fragmentshader ) );

            program.flattenKeys = flattenKeys;
            program.activeAttributeKeys = attributeKeys;
            program.activeTextureAttributeKeys = textureAttributeKeys;
            program.activeUniforms = this.getActiveUniforms( state, attributeKeys, textureAttributeKeys );
            program.generated = true;

            Notify.log( program.vertex.text );
            Notify.log( program.fragment.text );

            this.cache.push( program );
            return program;
        },

        compareAttributeMap: function ( attributeKeys0, attributeKeys1 ) {
            var key;
            for ( var i = 0, l = attributeKeys0.length; i < l; i++ ) {
                key = attributeKeys0[ i ];
                if ( attributeKeys1.indexOf( key ) === -1 ) {
                    return 1;
                }
            }
            if ( attributeKeys1.length !== attributeKeys0.length ) {
                return -1;
            }
            return 0;
        },

        fillTextureShader: function ( attributeMapList, validTextureAttributeKeys, mode ) {
            var shader = '';
            var commonTypeShader = {};

            for ( var i = 0, l = validTextureAttributeKeys.length; i < l; i++ ) {
                var attributeKeys = validTextureAttributeKeys[ i ];
                if ( attributeKeys === undefined ) {
                    continue;
                }
                var attributes = attributeMapList[ i ];
                for ( var j = 0, m = attributeKeys.length; j < m; j++ ) {
                    var key = attributeKeys[ j ];

                    var element = attributes[ key ].globalDefault;

                    if ( element.generateShaderCommon !== undefined && commonTypeShader[ key ] === undefined ) {
                        shader += element.generateShaderCommon( i, mode );
                        commonTypeShader[ key ] = true;
                    }

                    if ( element.generateShader ) {
                        shader += element.generateShader( i, mode );
                    }
                }
            }
            return shader;
        },

        fillShader: function ( attributeMap, validAttributeKeys, mode ) {
            var shader = '';
            var commonTypeShader = {};

            for ( var j = 0, m = validAttributeKeys.length; j < m; j++ ) {
                var key = validAttributeKeys[ j ];
                var element = attributeMap[ key ].globalDefault;
                var type = element.getType();
                if ( element.generateShaderCommon !== undefined && commonTypeShader[ type ] === undefined ) {
                    shader += element.generateShaderCommon( mode );
                    commonTypeShader[ type ] = true;
                }

                if ( element.generateShader ) {
                    shader += element.generateShader( mode );
                }
            }
            return shader;
        },

        getOrCreateVertexShader: function ( state, validAttributeKeys, validTextureAttributeKeys ) {
            var i;
            var modes = ShaderGenerator.Type;
            var shader = [
                '',
                '#ifdef GL_ES',
                'precision highp float;',
                '#endif',
                'attribute vec3 Vertex;',
                'attribute vec4 Color;',
                'attribute vec3 Normal;',
                'uniform float ArrayColorEnabled;',
                'uniform mat4 ModelViewMatrix;',
                'uniform mat4 ProjectionMatrix;',
                'uniform mat4 NormalMatrix;',
                'varying vec4 VertexColor;',
                ''
            ].join( '\n' );

            shader += this._writeShaderFromMode( state, validAttributeKeys, validTextureAttributeKeys, modes.VertexInit );

            var func = [
                '',
                'vec4 ftransform() {',
                '  return ProjectionMatrix * ModelViewMatrix * vec4(Vertex, 1.0);',
                '}'
            ].join( '\n' );

            shader += func;

            shader += this._writeShaderFromMode( state, validAttributeKeys, validTextureAttributeKeys, modes.VertexFunction );

            var body = [
                '',
                'void main(void) {',
                '  gl_Position = ftransform();',
                '  if (ArrayColorEnabled == 1.0)',
                '    VertexColor = Color;',
                '  else',
                '    VertexColor = vec4(1.0,1.0,1.0,1.0);',
                '  gl_PointSize = 1.0;',
                ''
            ].join( '\n' );

            shader += body;

            shader += this._writeShaderFromMode( state, validAttributeKeys, validTextureAttributeKeys, modes.VertexMain );

            shader += [
                '}',
                ''
            ].join( '\n' );

            return shader;
        },

        _writeShaderFromMode: function ( state, validAttributeKeys, validTextureAttributeKeys, mode ) {
            var str = '';
            str += this.fillTextureShader( state.textureAttributeMapList, validTextureAttributeKeys, mode );
            str += this.fillShader( state.attributeMap, validAttributeKeys, mode );
            return str;
        },

        getOrCreateFragmentShader: function ( state, validAttributeKeys, validTextureAttributeKeys ) {
            var i;
            var shader = [
                '',
                '#ifdef GL_ES',
                'precision highp float;',
                '#endif',
                'varying vec4 VertexColor;',
                'uniform float ArrayColorEnabled;',
                'vec4 fragColor;',
                ''
            ].join( '\n' );

            var modes = ShaderGenerator.Type;

            shader += this._writeShaderFromMode( state, validAttributeKeys, validTextureAttributeKeys, modes.FragmentInit );

            shader += this._writeShaderFromMode( state, validAttributeKeys, validTextureAttributeKeys, modes.FragmentFunction );

            shader += [
                'void main(void) {',
                '  fragColor = VertexColor;',
                ''
            ].join( '\n' );

            shader += this._writeShaderFromMode( state, validAttributeKeys, validTextureAttributeKeys, modes.FragmentMain );

            shader += this._writeShaderFromMode( state, validAttributeKeys, validTextureAttributeKeys, modes.FragmentEnd );

            shader += [
                '',
                '  gl_FragColor = fragColor;',
                '}'
            ].join( '\n' );

            return shader;
        }
    };

    return ShaderGenerator;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/StateAttribute',
    'osg/Vec3',
    'osg/Uniform',
    'osg/BufferArray',
    'osg/Geometry',
    'osg/PrimitiveSet',
    'osg/DrawArrays',
    'osg/DrawElements',
    'osg/Program',
    'osg/Shader'
], function ( Notify, StateAttribute, Vec3, Uniform, BufferArray, Geometry, PrimitiveSet, DrawArrays, DrawElements, Program, Shader ) {

    /**
     * Create a Textured Box on the given center with given size
     * @name createTexturedBox
     */
    var createTexturedBoxGeometry = function ( centerx, centery, centerz,
        sizex, sizey, sizez ) {

        var g = new Geometry();
        var dx, dy, dz;
        dx = sizex / 2.0;
        dy = sizey / 2.0;
        dz = sizez / 2.0;

        var vertexes = [];
        var uv = [];
        var normal = [];

        // -ve y plane
        vertexes[ 0 ] = centerx - dx;
        vertexes[ 1 ] = centery - dy;
        vertexes[ 2 ] = centerz + dz;
        normal[ 0 ] = 0;
        normal[ 1 ] = -1;
        normal[ 2 ] = 0;
        uv[ 0 ] = 0;
        uv[ 1 ] = 1;

        vertexes[ 3 ] = centerx - dx;
        vertexes[ 4 ] = centery - dy;
        vertexes[ 5 ] = centerz - dz;
        normal[ 3 ] = 0;
        normal[ 4 ] = -1;
        normal[ 5 ] = 0;
        uv[ 2 ] = 0;
        uv[ 3 ] = 0;

        vertexes[ 6 ] = centerx + dx;
        vertexes[ 7 ] = centery - dy;
        vertexes[ 8 ] = centerz - dz;
        normal[ 6 ] = 0;
        normal[ 7 ] = -1;
        normal[ 8 ] = 0;
        uv[ 4 ] = 1;
        uv[ 5 ] = 0;

        vertexes[ 9 ] = centerx + dx;
        vertexes[ 10 ] = centery - dy;
        vertexes[ 11 ] = centerz + dz;
        normal[ 9 ] = 0;
        normal[ 10 ] = -1;
        normal[ 11 ] = 0;
        uv[ 6 ] = 1;
        uv[ 7 ] = 1;


        // +ve y plane
        vertexes[ 12 ] = centerx + dx;
        vertexes[ 13 ] = centery + dy;
        vertexes[ 14 ] = centerz + dz;
        normal[ 12 ] = 0;
        normal[ 13 ] = 1;
        normal[ 14 ] = 0;
        uv[ 8 ] = 0;
        uv[ 9 ] = 1;

        vertexes[ 15 ] = centerx + dx;
        vertexes[ 16 ] = centery + dy;
        vertexes[ 17 ] = centerz - dz;
        normal[ 15 ] = 0;
        normal[ 16 ] = 1;
        normal[ 17 ] = 0;
        uv[ 10 ] = 0;
        uv[ 11 ] = 0;

        vertexes[ 18 ] = centerx - dx;
        vertexes[ 19 ] = centery + dy;
        vertexes[ 20 ] = centerz - dz;
        normal[ 18 ] = 0;
        normal[ 19 ] = 1;
        normal[ 20 ] = 0;
        uv[ 12 ] = 1;
        uv[ 13 ] = 0;

        vertexes[ 21 ] = centerx - dx;
        vertexes[ 22 ] = centery + dy;
        vertexes[ 23 ] = centerz + dz;
        normal[ 21 ] = 0;
        normal[ 22 ] = 1;
        normal[ 23 ] = 0;
        uv[ 14 ] = 1;
        uv[ 15 ] = 1;


        // +ve x plane
        vertexes[ 24 ] = centerx + dx;
        vertexes[ 25 ] = centery - dy;
        vertexes[ 26 ] = centerz + dz;
        normal[ 24 ] = 1;
        normal[ 25 ] = 0;
        normal[ 26 ] = 0;
        uv[ 16 ] = 0;
        uv[ 17 ] = 1;

        vertexes[ 27 ] = centerx + dx;
        vertexes[ 28 ] = centery - dy;
        vertexes[ 29 ] = centerz - dz;
        normal[ 27 ] = 1;
        normal[ 28 ] = 0;
        normal[ 29 ] = 0;
        uv[ 18 ] = 0;
        uv[ 19 ] = 0;

        vertexes[ 30 ] = centerx + dx;
        vertexes[ 31 ] = centery + dy;
        vertexes[ 32 ] = centerz - dz;
        normal[ 30 ] = 1;
        normal[ 31 ] = 0;
        normal[ 32 ] = 0;
        uv[ 20 ] = 1;
        uv[ 21 ] = 0;

        vertexes[ 33 ] = centerx + dx;
        vertexes[ 34 ] = centery + dy;
        vertexes[ 35 ] = centerz + dz;
        normal[ 33 ] = 1;
        normal[ 34 ] = 0;
        normal[ 35 ] = 0;
        uv[ 22 ] = 1;
        uv[ 23 ] = 1;

        // -ve x plane
        vertexes[ 36 ] = centerx - dx;
        vertexes[ 37 ] = centery + dy;
        vertexes[ 38 ] = centerz + dz;
        normal[ 36 ] = -1;
        normal[ 37 ] = 0;
        normal[ 38 ] = 0;
        uv[ 24 ] = 0;
        uv[ 25 ] = 1;

        vertexes[ 39 ] = centerx - dx;
        vertexes[ 40 ] = centery + dy;
        vertexes[ 41 ] = centerz - dz;
        normal[ 39 ] = -1;
        normal[ 40 ] = 0;
        normal[ 41 ] = 0;
        uv[ 26 ] = 0;
        uv[ 27 ] = 0;

        vertexes[ 42 ] = centerx - dx;
        vertexes[ 43 ] = centery - dy;
        vertexes[ 44 ] = centerz - dz;
        normal[ 42 ] = -1;
        normal[ 43 ] = 0;
        normal[ 44 ] = 0;
        uv[ 28 ] = 1;
        uv[ 29 ] = 0;

        vertexes[ 45 ] = centerx - dx;
        vertexes[ 46 ] = centery - dy;
        vertexes[ 47 ] = centerz + dz;
        normal[ 45 ] = -1;
        normal[ 46 ] = 0;
        normal[ 47 ] = 0;
        uv[ 30 ] = 1;
        uv[ 31 ] = 1;

        // top
        // +ve z plane
        vertexes[ 48 ] = centerx - dx;
        vertexes[ 49 ] = centery + dy;
        vertexes[ 50 ] = centerz + dz;
        normal[ 48 ] = 0;
        normal[ 49 ] = 0;
        normal[ 50 ] = 1;
        uv[ 32 ] = 0;
        uv[ 33 ] = 1;

        vertexes[ 51 ] = centerx - dx;
        vertexes[ 52 ] = centery - dy;
        vertexes[ 53 ] = centerz + dz;
        normal[ 51 ] = 0;
        normal[ 52 ] = 0;
        normal[ 53 ] = 1;
        uv[ 34 ] = 0;
        uv[ 35 ] = 0;

        vertexes[ 54 ] = centerx + dx;
        vertexes[ 55 ] = centery - dy;
        vertexes[ 56 ] = centerz + dz;
        normal[ 54 ] = 0;
        normal[ 55 ] = 0;
        normal[ 56 ] = 1;
        uv[ 36 ] = 1;
        uv[ 37 ] = 0;

        vertexes[ 57 ] = centerx + dx;
        vertexes[ 58 ] = centery + dy;
        vertexes[ 59 ] = centerz + dz;
        normal[ 57 ] = 0;
        normal[ 58 ] = 0;
        normal[ 59 ] = 1;
        uv[ 38 ] = 1;
        uv[ 39 ] = 1;

        // bottom
        // -ve z plane
        vertexes[ 60 ] = centerx + dx;
        vertexes[ 61 ] = centery + dy;
        vertexes[ 62 ] = centerz - dz;
        normal[ 60 ] = 0;
        normal[ 61 ] = 0;
        normal[ 62 ] = -1;
        uv[ 40 ] = 0;
        uv[ 41 ] = 1;

        vertexes[ 63 ] = centerx + dx;
        vertexes[ 64 ] = centery - dy;
        vertexes[ 65 ] = centerz - dz;
        normal[ 63 ] = 0;
        normal[ 64 ] = 0;
        normal[ 65 ] = -1;
        uv[ 42 ] = 0;
        uv[ 43 ] = 0;

        vertexes[ 66 ] = centerx - dx;
        vertexes[ 67 ] = centery - dy;
        vertexes[ 68 ] = centerz - dz;
        normal[ 66 ] = 0;
        normal[ 67 ] = 0;
        normal[ 68 ] = -1;
        uv[ 44 ] = 1;
        uv[ 45 ] = 0;

        vertexes[ 69 ] = centerx - dx;
        vertexes[ 70 ] = centery + dy;
        vertexes[ 71 ] = centerz - dz;
        normal[ 69 ] = 0;
        normal[ 70 ] = 0;
        normal[ 71 ] = -1;
        uv[ 46 ] = 1;
        uv[ 47 ] = 1;

        var indexes = [];
        indexes[ 0 ] = 0;
        indexes[ 1 ] = 1;
        indexes[ 2 ] = 2;
        indexes[ 3 ] = 0;
        indexes[ 4 ] = 2;
        indexes[ 5 ] = 3;

        indexes[ 6 ] = 4;
        indexes[ 7 ] = 5;
        indexes[ 8 ] = 6;
        indexes[ 9 ] = 4;
        indexes[ 10 ] = 6;
        indexes[ 11 ] = 7;

        indexes[ 12 ] = 8;
        indexes[ 13 ] = 9;
        indexes[ 14 ] = 10;
        indexes[ 15 ] = 8;
        indexes[ 16 ] = 10;
        indexes[ 17 ] = 11;

        indexes[ 18 ] = 12;
        indexes[ 19 ] = 13;
        indexes[ 20 ] = 14;
        indexes[ 21 ] = 12;
        indexes[ 22 ] = 14;
        indexes[ 23 ] = 15;

        indexes[ 24 ] = 16;
        indexes[ 25 ] = 17;
        indexes[ 26 ] = 18;
        indexes[ 27 ] = 16;
        indexes[ 28 ] = 18;
        indexes[ 29 ] = 19;

        indexes[ 30 ] = 20;
        indexes[ 31 ] = 21;
        indexes[ 32 ] = 22;
        indexes[ 33 ] = 20;
        indexes[ 34 ] = 22;
        indexes[ 35 ] = 23;

        g.getAttributes().Vertex = new BufferArray( BufferArray.ARRAY_BUFFER, vertexes, 3 );
        g.getAttributes().Normal = new BufferArray( BufferArray.ARRAY_BUFFER, normal, 3 );
        g.getAttributes().TexCoord0 = new BufferArray( BufferArray.ARRAY_BUFFER, uv, 2 );

        var primitive = new DrawElements( PrimitiveSet.TRIANGLES, new BufferArray( BufferArray.ELEMENT_ARRAY_BUFFER, indexes, 1 ) );
        g.getPrimitives().push( primitive );
        return g;
    };

    var createTexturedQuadGeometry = function ( cornerx, cornery, cornerz,
        wx, wy, wz,
        hx, hy, hz,
        l, b, r, t ) {

        if ( r === undefined && t === undefined ) {
            r = l;
            t = b;
            l = 0;
            b = 0;
        }

        var g = new Geometry();

        var vertexes = [];
        vertexes[ 0 ] = cornerx + hx;
        vertexes[ 1 ] = cornery + hy;
        vertexes[ 2 ] = cornerz + hz;

        vertexes[ 3 ] = cornerx;
        vertexes[ 4 ] = cornery;
        vertexes[ 5 ] = cornerz;

        vertexes[ 6 ] = cornerx + wx;
        vertexes[ 7 ] = cornery + wy;
        vertexes[ 8 ] = cornerz + wz;

        vertexes[ 9 ] = cornerx + wx + hx;
        vertexes[ 10 ] = cornery + wy + hy;
        vertexes[ 11 ] = cornerz + wz + hz;

        if ( r === undefined ) {
            r = 1.0;
        }
        if ( t === undefined ) {
            t = 1.0;
        }

        var uvs = [];
        uvs[ 0 ] = l;
        uvs[ 1 ] = t;

        uvs[ 2 ] = l;
        uvs[ 3 ] = b;

        uvs[ 4 ] = r;
        uvs[ 5 ] = b;

        uvs[ 6 ] = r;
        uvs[ 7 ] = t;

        var n = Vec3.cross( [ wx, wy, wz ], [ hx, hy, hz ], [] );
        var normal = [];
        normal[ 0 ] = n[ 0 ];
        normal[ 1 ] = n[ 1 ];
        normal[ 2 ] = n[ 2 ];

        normal[ 3 ] = n[ 0 ];
        normal[ 4 ] = n[ 1 ];
        normal[ 5 ] = n[ 2 ];

        normal[ 6 ] = n[ 0 ];
        normal[ 7 ] = n[ 1 ];
        normal[ 8 ] = n[ 2 ];

        normal[ 9 ] = n[ 0 ];
        normal[ 10 ] = n[ 1 ];
        normal[ 11 ] = n[ 2 ];


        var indexes = [];
        indexes[ 0 ] = 0;
        indexes[ 1 ] = 1;
        indexes[ 2 ] = 2;
        indexes[ 3 ] = 0;
        indexes[ 4 ] = 2;
        indexes[ 5 ] = 3;

        g.getAttributes().Vertex = new BufferArray( BufferArray.ARRAY_BUFFER, vertexes, 3 );
        g.getAttributes().Normal = new BufferArray( BufferArray.ARRAY_BUFFER, normal, 3 );
        g.getAttributes().TexCoord0 = new BufferArray( BufferArray.ARRAY_BUFFER, uvs, 2 );

        var primitive = new DrawElements( PrimitiveSet.TRIANGLES, new BufferArray( BufferArray.ELEMENT_ARRAY_BUFFER, indexes, 1 ) );
        g.getPrimitives().push( primitive );
        return g;
    };

    var createTexturedBox = function ( centerx, centery, centerz,
        sizex, sizey, sizez ) {
        Notify.log( 'createTexturedBox is deprecated use instead createTexturedBoxGeometry' );
        return createTexturedBoxGeometry( centerx, centery, centerz,
            sizex, sizey, sizez );
    };

    var createTexturedQuad = function ( cornerx, cornery, cornerz,
        wx, wy, wz,
        hx, hy, hz,
        l, b, r, t ) {
        Notify.log( 'createTexturedQuad is deprecated use instead createTexturedQuadGeometry' );
        return createTexturedQuadGeometry( cornerx, cornery, cornerz,
            wx, wy, wz,
            hx, hy, hz,
            l, b, r, t );
    };

    var createAxisGeometry = function ( size ) {
        if ( size === undefined ) {
            size = 5.0;
        }
        if ( createAxisGeometry.getShader === undefined ) {
            createAxisGeometry.getShader = function () {
                if ( createAxisGeometry.getShader.program === undefined ) {
                    var vertexshader = [
                        '#ifdef GL_ES',
                        'precision highp float;',
                        '#endif',
                        'attribute vec3 Vertex;',
                        'attribute vec4 Color;',
                        'uniform mat4 ModelViewMatrix;',
                        'uniform mat4 ProjectionMatrix;',
                        '',
                        'varying vec4 FragColor;',
                        '',
                        'vec4 ftransform() {',
                        'return ProjectionMatrix * ModelViewMatrix * vec4(Vertex, 1.0);',
                        '}',
                        '',
                        'void main(void) {',
                        'gl_Position = ftransform();',
                        'FragColor = Color;',
                        '}'
                    ].join( '\n' );

                    var fragmentshader = [
                        '#ifdef GL_ES',
                        'precision highp float;',
                        '#endif',
                        'varying vec4 FragColor;',

                        'void main(void) {',
                        'gl_FragColor = FragColor;',
                        '}'
                    ].join( '\n' );

                    var program = new Program( new Shader( gl.VERTEX_SHADER, vertexshader ),
                        new Shader( gl.FRAGMENT_SHADER, fragmentshader ) );
                    createAxisGeometry.getShader.program = program;
                }
                return createAxisGeometry.getShader.program;
            };
        }

        var g = new Geometry();

        var vertexes = [];
        vertexes.push( 0, 0, 0 );
        vertexes.push( size, 0, 0 );

        vertexes.push( 0, 0, 0 );
        vertexes.push( 0, size, 0 );

        vertexes.push( 0, 0, 0 );
        vertexes.push( 0, 0, size );

        var colors = [];
        colors.push( 1, 0, 0, 1.0 );
        colors.push( 1, 0, 0, 1.0 );

        colors.push( 0, 1, 0, 1.0 );
        colors.push( 0, 1, 0, 1.0 );

        colors.push( 0, 0, 1, 1.0 );
        colors.push( 0, 0, 1, 1.0 );

        g.getAttributes().Vertex = new BufferArray( BufferArray.ARRAY_BUFFER, vertexes, 3 );
        g.getAttributes().Color = new BufferArray( BufferArray.ARRAY_BUFFER, colors, 4 );

        var primitive = new DrawArrays( PrimitiveSet.LINES, 0, 6 );
        g.getPrimitives().push( primitive );
        g.getOrCreateStateSet().setAttributeAndMode( createAxisGeometry.getShader() );

        return g;
    };

    /**
     * Create a Textured Sphere on the given center with given radius
     * @name createTexturedSphere
     * @author Darrell Esau
     */
    var createTexturedSphere = function ( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {
        radius = radius || 50;

        phiStart = phiStart !== undefined ? phiStart : 0;
        phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

        thetaStart = thetaStart !== undefined ? thetaStart : 0;
        thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

        var segmentsX = Math.max( 3, Math.floor( widthSegments ) || 8 );
        var segmentsY = Math.max( 2, Math.floor( heightSegments ) || 6 );

        var x, y, vertices = [],
            uvs = [],
            allVertices = [],
            indexes = [];

        for ( y = 0; y <= segmentsY; y++ ) {
            var verticesRow = [];
            var uvsRow = [];

            for ( x = 0; x <= segmentsX; x++ ) {
                var u = x / segmentsX;
                var v = y / segmentsY;

                var vertex = {};
                vertex.x = -radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
                vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
                vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

                allVertices.push( vertex );

                verticesRow.push( allVertices.length - 1 );
                uvsRow.push( {
                    u: u,
                    v: 1 - v
                } );

            }

            vertices.push( verticesRow );
            uvs.push( uvsRow );
        }

        var fullVerticesList = [];
        var fullNormalsList = [];
        var fullUVList = [];
        var vtxCount = 0;

        for ( y = 0; y < segmentsY; y++ ) {
            for ( x = 0; x < segmentsX; x++ ) {
                var v1 = {}, v2 = {}, v3 = {}, v4 = {}; //zz here
                var vtxStartOffset = ( y * segmentsX * 3 ) + ( x * 3 );

                var v1 = vertices[ y ][ x + 1 ];
                var v2 = vertices[ y ][ x ];
                var v3 = vertices[ y + 1 ][ x ];
                var v4 = vertices[ y + 1 ][ x + 1 ];

                var vtx1 = allVertices[ v1 ];
                var vtx2 = allVertices[ v2 ];
                var vtx3 = allVertices[ v3 ];
                var vtx4 = allVertices[ v4 ];

                fullVerticesList.push( vtx1.x );
                fullVerticesList.push( vtx1.y );
                fullVerticesList.push( vtx1.z );

                fullVerticesList.push( vtx2.x );
                fullVerticesList.push( vtx2.y );
                fullVerticesList.push( vtx2.z );

                fullVerticesList.push( vtx3.x );
                fullVerticesList.push( vtx3.y );
                fullVerticesList.push( vtx3.z );

                fullVerticesList.push( vtx4.x );
                fullVerticesList.push( vtx4.y );
                fullVerticesList.push( vtx4.z );
                vtxCount += 4;

                var tristart = vtxCount - 4;
                indexes.push( tristart );
                indexes.push( tristart + 1 );
                indexes.push( tristart + 2 );
                indexes.push( tristart );
                indexes.push( tristart + 2 );
                indexes.push( tristart + 3 );

                var n1 = Vec3.normalize( [ vtx1.x, vtx1.y, vtx1.z ], [] );
                var n2 = Vec3.normalize( [ vtx2.x, vtx2.y, vtx2.z ], [] );
                var n3 = Vec3.normalize( [ vtx3.x, vtx3.y, vtx3.z ], [] );
                var n4 = Vec3.normalize( [ vtx4.x, vtx4.y, vtx4.z ], [] );

                fullNormalsList.push( n1[ 0 ] );
                fullNormalsList.push( n1[ 1 ] );
                fullNormalsList.push( n1[ 2 ] );

                fullNormalsList.push( n2[ 0 ] );
                fullNormalsList.push( n2[ 1 ] );
                fullNormalsList.push( n2[ 2 ] );

                fullNormalsList.push( n3[ 0 ] );
                fullNormalsList.push( n3[ 1 ] );
                fullNormalsList.push( n3[ 2 ] );

                fullNormalsList.push( n4[ 0 ] );
                fullNormalsList.push( n4[ 1 ] );
                fullNormalsList.push( n4[ 2 ] );

                var uv1 = uvs[ y ][ x + 1 ];
                var uv2 = uvs[ y ][ x ];
                var uv3 = uvs[ y + 1 ][ x ];
                var uv4 = uvs[ y + 1 ][ x + 1 ];

                fullUVList.push( uv1.u );
                fullUVList.push( uv1.v );

                fullUVList.push( uv2.u );
                fullUVList.push( uv2.v );

                fullUVList.push( uv3.u );
                fullUVList.push( uv3.v );

                fullUVList.push( uv4.u );
                fullUVList.push( uv4.v );

            }

        }

        var g = new Geometry();
        g.getAttributes().Vertex = new BufferArray( gl.ARRAY_BUFFER, fullVerticesList, 3 );
        g.getAttributes().Normal = new BufferArray( gl.ARRAY_BUFFER, fullNormalsList, 3 );
        g.getAttributes().TexCoord0 = new BufferArray( gl.ARRAY_BUFFER, fullUVList, 2 );

        var primitive = new DrawElements( gl.TRIANGLES, new BufferArray( gl.ELEMENT_ARRAY_BUFFER, indexes, 1 ) );
        g.getPrimitives().push( primitive );
        return g;
    };

    return {
        createTexturedBoxGeometry: createTexturedBoxGeometry,
        createTexturedQuadGeometry: createTexturedQuadGeometry,
        createTexturedBox: createTexturedBox,
        createTexturedQuad: createTexturedQuad,
        createAxisGeometry: createAxisGeometry,
        createTexturedSphere: createTexturedSphere
    };
} );
/*global define */

define( [], function () {

    var Stack = function () {};
    Stack.create = function () {
        var a = [];
        a.globalDefault = undefined;
        a.lastApplied = undefined;
        a.back = function () {
            return this[ this.length - 1 ];
        };
        return a;
    };

    return Stack;
} );
/*global define */

define( [
    'osgUtil/osgPool'
], function ( osgPool ) {

    var StateGraph = function () {
        this.depth = 0;
        this.children = {};
        this.children.keys = [];
        this.leafs = [];
        this.stateset = undefined;
        this.parent = undefined;
    };


    StateGraph.prototype = {
        clean: function () {
            this.leafs.splice( 0, this.leafs.length );
            this.stateset = undefined;
            this.parent = undefined;
            this.depth = 0;
            var key, keys = this.children.keys;
            for ( var i = 0, l = keys.length; i < l; i++ ) {
                key = keys[ i ];
                this.children[ key ].clean();
                osgPool.memoryPools.stateGraph.put( this.children[ key ] );
            }
            this.children = {};
            keys.splice( 0, keys.length );
            this.children.keys = keys;
        },
        getStateSet: function () {
            return this.stateset;
        },
        findOrInsert: function ( stateset ) {
            var sg;
            if ( !this.children[ stateset.id ] ) {

                //sg = new StateGraph();
                sg = osgPool.memoryPools.stateGraph.get();

                sg.parent = this;
                sg.depth = this.depth + 1;
                sg.stateset = stateset;
                this.children[ stateset.id ] = sg;
                this.children.keys.push( stateset.id );
            } else {
                sg = this.children[ stateset.id ];
            }
            return sg;
        },
        moveToRootStateGraph: function ( state, sg_current ) {
            // need to pop back all statesets and matrices.
            while ( sg_current ) {
                if ( sg_current.stateSet ) {
                    state.popStateSet();
                }
                sg_current = sg_current._parent;
            }
        },
        moveStateGraph: function ( state, sg_current, sg_new ) {
            var stack;
            var i;
            if ( sg_new === sg_current || sg_new === undefined ) {
                return;
            }

            if ( sg_current === undefined ) {
                stack = [];
                // push stateset from sg_new to root, and apply
                // stateset from root to sg_new
                do {
                    if ( sg_new.stateset !== undefined ) {
                        stack.push( sg_new.stateset );
                    }
                    sg_new = sg_new.parent;
                } while ( sg_new );

                stack.reverse();
                for ( i = 0, l = stack.length; i < l; ++i ) {
                    state.pushStateSet( stack[ i ] );
                }
                return;
            } else if ( sg_current.parent === sg_new.parent ) {
                // first handle the typical case which is two state groups
                // are neighbours.

                // state has changed so need to pop old state.
                if ( sg_current.stateset !== undefined ) {
                    state.popStateSet();
                }
                // and push new state.
                if ( sg_new.stateset !== undefined ) {
                    state.pushStateSet( sg_new.stateset );
                }
                return;
            }

            // need to pop back up to the same depth as the new state group.
            while ( sg_current.depth > sg_new.depth ) {
                if ( sg_current.stateset !== undefined ) {
                    state.popStateSet();
                }
                sg_current = sg_current.parent;
            }

            // use return path to trace back steps to sg_new.
            stack = [];

            // need to pop back up to the same depth as the curr state group.
            while ( sg_new.depth > sg_current.depth ) {
                if ( sg_new.stateset !== undefined ) {
                    stack.push( sg_new.stateset );
                }
                sg_new = sg_new.parent;
            }

            // now pop back up both parent paths until they agree.

            // DRT - 10/22/02
            // should be this to conform with above case where two StateGraph
            // nodes have the same parent
            while ( sg_current !== sg_new ) {
                if ( sg_current.stateset !== undefined ) {
                    state.popStateSet();
                }
                sg_current = sg_current.parent;

                if ( sg_new.stateset !== undefined ) {
                    stack.push( sg_new.stateset );
                }
                sg_new = sg_new.parent;
            }

            stack.reverse();
            stackLength = stack.length;
            for ( i = 0; i < stackLength; ++i ) {
                state.pushStateSet( stack[ i ] );
            }
        }
    };

    return StateGraph;
} );
/*global define */

define( [
    'osg/StateAttribute',
    'osg/Stack',
    'osg/Uniform',
    'osg/Matrix',
    'osg/ShaderGenerator'
], function ( StateAttribute, Stack, Uniform, Matrix, ShaderGenerator ) {

    var State = function () {
        this._graphicContext = undefined;

        this.currentVBO = null;
        this.vertexAttribList = [];
        this.programs = Stack.create();
        this.stateSets = Stack.create();
        this.uniforms = {};
        this.uniforms.uniformKeys = [];

        this.textureAttributeMapList = [];

        this.attributeMap = {};
        this.attributeMap.attributeKeys = [];

        this.modeMap = {};

        this.shaderGenerator = new ShaderGenerator();

        this.modelViewMatrix = Uniform.createMatrix4( Matrix.makeIdentity( [] ), 'ModelViewMatrix' );
        this.projectionMatrix = Uniform.createMatrix4( Matrix.makeIdentity( [] ), 'ProjectionMatrix' );
        this.normalMatrix = Uniform.createMatrix4( Matrix.makeIdentity( [] ), 'NormalMatrix' );

        // track uniform for color array enabled
        this.uniforms.ArrayColorEnabled = Stack.create();
        this.uniforms.ArrayColorEnabled.globalDefault = Uniform.createFloat1( 0.0, 'ArrayColorEnabled' );
        this.uniforms.ArrayColorEnabled.uniformKeys = [];
        this.uniforms.ArrayColorEnabled.uniformKeys.push( 'ArrayColorEnabled' );


        this.vertexAttribMap = {};
        this.vertexAttribMap._disable = [];
        this.vertexAttribMap._keys = [];
    };

    State.prototype = {

        setGraphicContext: function ( graphicContext ) {
            this._graphicContext = graphicContext;
        },
        getGraphicContext: function () {
            return this._graphicContext;
        },

        pushStateSet: function ( stateset ) {
            this.stateSets.push( stateset );

            if ( stateset.attributeMap ) {
                this.pushAttributeMap( this.attributeMap, stateset.attributeMap );
            }
            if ( stateset.textureAttributeMapList ) {
                var list = stateset.textureAttributeMapList;
                for ( var textureUnit = 0, l = list.length; textureUnit < l; textureUnit++ ) {
                    if ( list[ textureUnit ] === undefined ) {
                        continue;
                    }
                    if ( !this.textureAttributeMapList[ textureUnit ] ) {
                        this.textureAttributeMapList[ textureUnit ] = {};
                        this.textureAttributeMapList[ textureUnit ].attributeKeys = [];
                    }
                    this.pushAttributeMap( this.textureAttributeMapList[ textureUnit ], list[ textureUnit ] );
                }
            }

            if ( stateset.uniforms ) {
                this.pushUniformsList( this.uniforms, stateset.uniforms );
            }
        },

        applyStateSet: function ( stateset ) {
            this.pushStateSet( stateset );
            this.apply();
            this.popStateSet();
        },

        popAllStateSets: function () {
            while ( this.stateSets.length ) {
                this.popStateSet();
            }
        },
        popStateSet: function () {
            var stateset = this.stateSets.pop();
            if ( stateset.program ) {
                this.programs.pop();
            }
            if ( stateset.attributeMap ) {
                this.popAttributeMap( this.attributeMap, stateset.attributeMap );
            }
            if ( stateset.textureAttributeMapList ) {
                var list = stateset.textureAttributeMapList;
                for ( var textureUnit = 0, l = list.length; textureUnit < l; textureUnit++ ) {
                    if ( list[ textureUnit ] === undefined ) {
                        continue;
                    }
                    this.popAttributeMap( this.textureAttributeMapList[ textureUnit ], list[ textureUnit ] );
                }
            }

            if ( stateset.uniforms ) {
                this.popUniformsList( this.uniforms, stateset.uniforms );
            }
        },

        haveAppliedAttribute: function ( attribute ) {
            var key = attribute.getTypeMember();
            var attributeStack = this.attributeMap[ key ];
            attributeStack.lastApplied = attribute;
            attributeStack.asChanged = true;
        },

        applyAttribute: function ( attribute ) {
            var key = attribute.getTypeMember();
            var attributeStack = this.attributeMap[ key ];
            if ( attributeStack === undefined ) {
                attributeStack = Stack.create();
                this.attributeMap[ key ] = attributeStack;
                this.attributeMap[ key ].globalDefault = attribute.cloneType();
                this.attributeMap.attributeKeys.push( key );
            }

            if ( attributeStack.lastApplied !== attribute ) {
                //        if (attributeStack.lastApplied !== attribute || attribute.isDirty()) {
                if ( attribute.apply ) {
                    attribute.apply( this );
                }
                attributeStack.lastApplied = attribute;
                attributeStack.asChanged = true;
            }
        },
        applyTextureAttribute: function ( unit, attribute ) {
            var gl = this.getGraphicContext();
            gl.activeTexture( gl.TEXTURE0 + unit );
            var key = attribute.getTypeMember();

            if ( !this.textureAttributeMapList[ unit ] ) {
                this.textureAttributeMapList[ unit ] = {};
                this.textureAttributeMapList[ unit ].attributeKeys = [];
            }

            var attributeStack = this.textureAttributeMapList[ unit ][ key ];
            if ( attributeStack === undefined ) {
                attributeStack = Stack.create();
                this.textureAttributeMapList[ unit ][ key ] = attributeStack;
                attributeStack.globalDefault = attribute.cloneType();
                this.textureAttributeMapList[ unit ].attributeKeys.push( key );
            }

            if ( attributeStack.lastApplied !== attribute ) {
                //if (attributeStack.lastApplied !== attribute || attribute.isDirty()) {
                if ( attribute.apply ) {
                    attribute.apply( this );
                }
                attributeStack.lastApplied = attribute;
                attributeStack.asChanged = true;
            }
        },

        getLastProgramApplied: function () {
            return this.programs.lastApplied;
        },

        pushGeneratedProgram: function () {
            var program;
            if ( this.attributeMap.Program !== undefined && this.attributeMap.Program.length !== 0 ) {
                program = this.attributeMap.Program.back().object;
                value = this.attributeMap.Program.back().value;
                if ( program !== undefined && value !== StateAttribute.OFF ) {
                    this.programs.push( this.getObjectPair( program, value ) );
                    return program;
                }
            }

            var attributes = {
                'textureAttributeMapList': this.textureAttributeMapList,
                'attributeMap': this.attributeMap
            };

            var generator = this.stateSets.back().getShaderGenerator();
            if ( generator === undefined ) {
                generator = this.shaderGenerator;
            }
            program = generator.getOrCreateProgram( attributes );
            this.programs.push( this.getObjectPair( program, StateAttribute.ON ) );
            return program;
        },

        popGeneratedProgram: function () {
            this.programs.pop();
        },

        applyWithoutProgram: function () {
            this.applyAttributeMap( this.attributeMap );
            this.applyTextureAttributeMapList( this.textureAttributeMapList );
        },

        apply: function () {
            var gl = this._graphicContext;



            this.applyAttributeMap( this.attributeMap );
            this.applyTextureAttributeMapList( this.textureAttributeMapList );

            this.pushGeneratedProgram();
            var program = this.programs.back().object;
            if ( this.programs.lastApplied !== program ) {
                program.apply( this );
                this.programs.lastApplied = program;
            }

            var programUniforms;
            var activeUniforms;
            var i;
            var key;
            var self = this;
            var uniformMap;
            if ( program.generated === true ) {
                // note that about TextureAttribute that need uniform on unit we would need to improve
                // the current uniformList ...

                programUniforms = program.uniformsCache;
                activeUniforms = program.activeUniforms;
                if ( false ) {
                    var regenrateKeys = false;
                    for ( i = 0, l = activeUniforms.uniformKeys.length; i < l; i++ ) {
                        var name = activeUniforms.uniformKeys[ i ];
                        var location = programUniforms[ name ];
                        if ( location !== undefined ) {
                            activeUniforms[ name ].apply( location );
                        } else {
                            regenrateKeys = true;
                            delete activeUniforms[ name ];
                        }
                    }
                    if ( regenrateKeys ) {
                        var keys = [];
                        for ( key in activeUniforms ) {
                            if ( key !== 'uniformKeys' ) {
                                keys.push( key );
                            }
                        }
                        activeUniforms.uniformKeys = keys;
                    }
                } else {
                    uniformMap = this.uniforms;
                    ( function () {

                        var programUniforms = program.uniformsCache;
                        var activeUniforms = program.activeUniforms;
                        var foreignUniforms = program.foreignUniforms;

                        // when we apply the shader for the first time, we want to compute the active uniforms for this shader and the list of uniforms not extracted from attributes called foreignUniforms

                        // typically the following code will be executed once on the first execution of generated program
                        if ( !foreignUniforms ) {

                            ( function () {

                                foreignUniforms = [];
                                for ( var i = 0, l = programUniforms.uniformKeys.length; i < l; i++ ) {
                                    var name = programUniforms.uniformKeys[ i ];
                                    var location = programUniforms[ name ];
                                    if ( location !== undefined && activeUniforms[ name ] === undefined ) {
                                        // filter 'standard' uniform matrix that will be applied for all shader
                                        if ( name !== self.modelViewMatrix.name &&
                                            name !== self.projectionMatrix.name &&
                                            name !== self.normalMatrix.name &&
                                            name !== 'ArrayColorEnabled' ) {
                                            foreignUniforms.push( name );
                                        }
                                    }
                                }
                                program.foreignUniforms = foreignUniforms;

                            } )();


                            // remove uniforms listed by attributes (getActiveUniforms) but not required by the program
                            ( function () {
                                var regenrateKeys = false;
                                for ( var i = 0, l = activeUniforms.uniformKeys.length; i < l; i++ ) {
                                    var name = activeUniforms.uniformKeys[ i ];
                                    var location = programUniforms[ name ];
                                    if ( location === undefined || location === null ) {
                                        delete activeUniforms[ name ];
                                    }
                                }
                                // regenerate uniforms keys
                                var keys = Object.keys( activeUniforms );
                                for ( var j = 0, m = keys.length; j < m; j++ ) {
                                    if ( keys[ j ] === 'uniformKeys' ) {
                                        keys.splice( j, 1 );
                                        break;
                                    }
                                }
                                activeUniforms.uniformKeys = keys;
                            } )();
                        }


                        // apply active uniforms
                        // caching uniforms from attribtues make it impossible to overwrite uniform with a custom uniform instance not used in the attributes
                        ( function () {
                            for ( var i = 0, l = activeUniforms.uniformKeys.length; i < l; i++ ) {
                                var name = activeUniforms.uniformKeys[ i ];
                                var location = programUniforms[ name ];
                                activeUniforms[ name ].apply( location );
                            }
                        } )();


                        // apply now foreign uniforms, it's uniforms needed by the program but not contains in attributes used to generate this program
                        ( function () {
                            for ( var i = 0, l = foreignUniforms.length; i < l; i++ ) {
                                var name = foreignUniforms[ i ];
                                var uniformStack = uniformMap[ name ];
                                var location = programUniforms[ name ];
                                var uniform;
                                if ( uniformStack !== undefined ) {
                                    if ( uniformStack.length === 0 ) {
                                        uniform = uniformStack.globalDefault;
                                    } else {
                                        uniform = uniformStack.back().object;
                                    }
                                    uniform.apply( location );
                                }
                            }
                        } )();

                    } )();
                }
            } else {

                //this.applyUniformList(this.uniforms, {});

                // custom program so we will iterate on uniform from the program and apply them
                // but in order to be able to use Attribute in the state graph we will check if
                // our program want them. It must be defined by the user
                var programObject = program.program;
                var location1;
                var uniformStack;
                var uniform;

                programUniforms = program.uniformsCache;
                uniformMap = this.uniforms;

                // first time we see attributes key, so we will keep a list of uniforms from attributes
                activeUniforms = [];
                var trackAttributes = program.trackAttributes;
                var trackUniforms = program.trackUniforms;
                var attribute;
                var uniforms;
                var a;
                // loop on wanted attributes and texture attribute to track state graph uniforms from those attributes
                if ( trackAttributes !== undefined && trackUniforms === undefined ) {
                    var attributeKeys = program.trackAttributes.attributeKeys;
                    if ( attributeKeys !== undefined ) {
                        for ( i = 0, l = attributeKeys.length; i < l; i++ ) {
                            key = attributeKeys[ i ];
                            attributeStack = this.attributeMap[ key ];
                            if ( attributeStack === undefined ) {
                                continue;
                            }
                            // we just need the uniform list and not the attribute itself
                            attribute = attributeStack.globalDefault;
                            if ( attribute.getOrCreateUniforms === undefined ) {
                                continue;
                            }
                            uniforms = attribute.getOrCreateUniforms();
                            for ( a = 0, b = uniforms.uniformKeys.length; a < b; a++ ) {
                                activeUniforms.push( uniforms[ uniforms.uniformKeys[ a ] ] );
                            }
                        }
                    }

                    var textureAttributeKeysList = program.trackAttributes.textureAttributeKeys;
                    if ( textureAttributeKeysList !== undefined ) {
                        for ( i = 0, l = textureAttributeKeysList.length; i < l; i++ ) {
                            var tak = textureAttributeKeysList[ i ];
                            if ( tak === undefined ) {
                                continue;
                            }
                            for ( var j = 0, m = tak.length; j < m; j++ ) {
                                key = tak[ j ];
                                var attributeList = this.textureAttributeMapList[ i ];
                                if ( attributeList === undefined ) {
                                    continue;
                                }
                                attributeStack = attributeList[ key ];
                                if ( attributeStack === undefined ) {
                                    continue;
                                }
                                attribute = attributeStack.globalDefault;
                                if ( attribute.getOrCreateUniforms === undefined ) {
                                    continue;
                                }
                                uniforms = attribute.getOrCreateUniforms( i );
                                for ( a = 0, b = uniforms.uniformKeys.length; a < b; a++ ) {
                                    activeUniforms.push( uniforms[ uniforms.uniformKeys[ a ] ] );
                                }
                            }
                        }
                    }
                    // now we have a list on uniforms we want to track but we will filter them to use only what is needed by our program
                    // not that if you create a uniforms whith the same name of a tracked attribute, and it will override it
                    var uniformsFinal = {};
                    for ( i = 0, l = activeUniforms.length; i < l; i++ ) {
                        var u = activeUniforms[ i ];
                        var loc = gl.getUniformLocation( programObject, u.name );
                        if ( loc !== undefined && loc !== null ) {
                            uniformsFinal[ u.name ] = activeUniforms[ i ];
                        }
                    }
                    program.trackUniforms = uniformsFinal;
                }

                for ( i = 0, l = programUniforms.uniformKeys.length; i < l; i++ ) {
                    var uniformKey = programUniforms.uniformKeys[ i ];
                    location1 = programUniforms[ uniformKey ];

                    uniformStack = uniformMap[ uniformKey ];
                    if ( uniformStack === undefined ) {
                        if ( program.trackUniforms !== undefined ) {
                            uniform = program.trackUniforms[ uniformKey ];
                            if ( uniform !== undefined ) {
                                uniform.apply( location1 );
                            }
                        }
                    } else {
                        if ( uniformStack.length === 0 ) {
                            uniform = uniformStack.globalDefault;
                        } else {
                            uniform = uniformStack.back().object;
                        }
                        uniform.apply( location1 );
                    }
                }
            }
        },

        applyUniformList: function ( uniformMap, uniformList ) {

            var program = this.getLastProgramApplied();
            var programObject = program.program;
            var location;
            var uniformStack;
            var uniform;
            var uniformKeys = {};
            var key;

            var programUniforms = program.uniformsCache;

            for ( var i = 0, l = programUniforms.uniformKeys.length; i < l; i++ ) {
                var uniformKey = programUniforms.uniformKeys[ i ];
                location = programUniforms[ uniformKey ];

                // get the one in the list
                uniform = uniformList[ uniformKey ];

                // not found ? check on the stack
                if ( uniform === undefined ) {
                    uniformStack = uniformMap[ uniformKey ];
                    if ( uniformStack === undefined ) {
                        continue;
                    }
                    if ( uniformStack.length === 0 ) {
                        uniform = uniformStack.globalDefault;
                    } else {
                        uniform = uniformStack.back().object;
                    }
                }
                uniform.apply( location );
            }
        },

        applyAttributeMap: function ( attributeMap ) {
            var attributeStack;

            for ( var i = 0, l = attributeMap.attributeKeys.length; i < l; i++ ) {
                var key = attributeMap.attributeKeys[ i ];

                attributeStack = attributeMap[ key ];
                if ( attributeStack === undefined ) {
                    continue;
                }
                var attribute;
                if ( attributeStack.length === 0 ) {
                    attribute = attributeStack.globalDefault;
                } else {
                    attribute = attributeStack.back().object;
                }

                if ( attributeStack.asChanged ) {
                    //            if (attributeStack.lastApplied !== attribute || attribute.isDirty()) {
                    if ( attributeStack.lastApplied !== attribute ) {
                        if ( attribute.apply ) {
                            attribute.apply( this );
                        }
                        attributeStack.lastApplied = attribute;
                    }
                    attributeStack.asChanged = false;
                }
            }
        },

        getObjectPair: function ( uniform, value ) {
            return {
                object: uniform,
                value: value
            };
        },
        pushUniformsList: function ( uniformMap, uniformList ) {
            var name;
            var uniform;
            for ( var i = 0, l = uniformList.uniformKeys.length; i < l; i++ ) {
                var key = uniformList.uniformKeys[ i ];
                uniformPair = uniformList[ key ];
                uniform = uniformPair.getUniform();
                name = uniform.name;
                if ( uniformMap[ name ] === undefined ) {
                    uniformMap[ name ] = Stack.create();
                    uniformMap[ name ].globalDefault = uniform;
                    uniformMap.uniformKeys.push( name );
                }
                var value = uniformPair.getValue();
                var stack = uniformMap[ name ];
                if ( stack.length === 0 ) {
                    stack.push( this.getObjectPair( uniform, value ) );
                } else if ( ( stack[ stack.length - 1 ].value & StateAttribute.OVERRIDE ) && !( value & StateAttribute.PROTECTED ) ) {
                    stack.push( stack[ stack.length - 1 ] );
                } else {
                    stack.push( this.getObjectPair( uniform, value ) );
                }
            }
        },
        popUniformsList: function ( uniformMap, uniformList ) {
            var uniform;
            for ( var i = 0, l = uniformList.uniformKeys.length; i < l; i++ ) {
                var key = uniformList.uniformKeys[ i ];
                uniformMap[ key ].pop();
            }
        },

        applyTextureAttributeMapList: function ( textureAttributesMapList ) {
            var gl = this._graphicContext;
            var textureAttributeMap;

            for ( var textureUnit = 0, l = textureAttributesMapList.length; textureUnit < l; textureUnit++ ) {
                textureAttributeMap = textureAttributesMapList[ textureUnit ];
                if ( textureAttributeMap === undefined ) {
                    continue;
                }

                for ( var i = 0, lt = textureAttributeMap.attributeKeys.length; i < lt; i++ ) {
                    var key = textureAttributeMap.attributeKeys[ i ];

                    var attributeStack = textureAttributeMap[ key ];
                    if ( attributeStack === undefined ) {
                        continue;
                    }

                    var attribute;
                    if ( attributeStack.length === 0 ) {
                        attribute = attributeStack.globalDefault;
                    } else {
                        attribute = attributeStack.back().object;
                    }
                    if ( attributeStack.asChanged ) {
                        //                if (attributeStack.lastApplied !== attribute || attribute.isDirty()) {
                        gl.activeTexture( gl.TEXTURE0 + textureUnit );
                        attribute.apply( this, textureUnit );
                        attributeStack.lastApplied = attribute;
                        attributeStack.asChanged = false;
                    }
                }
            }
        },
        setGlobalDefaultValue: function ( attribute ) {
            var key = attribute.getTypeMember();
            if ( this.attributeMap[ key ] ) {
                this.attributeMap[ key ].globalDefault = attribute;
            } else {
                this.attributeMap[ key ] = Stack.create();
                this.attributeMap[ key ].globalDefault = attribute;

                this.attributeMap.attributeKeys.push( key );
            }
        },

        pushAttributeMap: function ( attributeMap, attributeList ) {
            var attributeStack;
            for ( var i = 0, l = attributeList.attributeKeys.length; i < l; i++ ) {
                var type = attributeList.attributeKeys[ i ];
                var attributePair = attributeList[ type ];
                var attribute = attributePair.getAttribute();
                if ( attributeMap[ type ] === undefined ) {
                    attributeMap[ type ] = Stack.create();
                    attributeMap[ type ].globalDefault = attribute.cloneType();

                    attributeMap.attributeKeys.push( type );
                }

                var value = attributePair.getValue();
                attributeStack = attributeMap[ type ];
                if ( attributeStack.length === 0 ) {
                    attributeStack.push( this.getObjectPair( attribute, value ) );
                } else if ( ( attributeStack[ attributeStack.length - 1 ].value & StateAttribute.OVERRIDE ) && !( value & StateAttribute.PROTECTED ) ) {
                    attributeStack.push( attributeStack[ attributeStack.length - 1 ] );
                } else {
                    attributeStack.push( this.getObjectPair( attribute, value ) );
                }

                attributeStack.asChanged = true;
            }
        },
        popAttributeMap: function ( attributeMap, attributeList ) {
            var attributeStack;
            for ( var i = 0, l = attributeList.attributeKeys.length; i < l; i++ ) {
                type = attributeList.attributeKeys[ i ];
                attributeStack = attributeMap[ type ];
                attributeStack.pop();
                attributeStack.asChanged = true;
            }
        },

        setIndexArray: function ( array ) {
            var gl = this._graphicContext;
            if ( this.currentIndexVBO !== array ) {
                array.bind( gl );
                this.currentIndexVBO = array;
            }
            if ( array.isDirty() ) {
                array.compile( gl );
            }
        },

        lazyDisablingOfVertexAttributes: function () {
            var keys = this.vertexAttribMap._keys;
            for ( var i = 0, l = keys.length; i < l; i++ ) {
                var attr = keys[ i ];
                if ( this.vertexAttribMap[ attr ] ) {
                    this.vertexAttribMap._disable[ attr ] = true;
                }
            }
        },

        applyDisablingOfVertexAttributes: function () {
            var keys = this.vertexAttribMap._keys;
            for ( var i = 0, l = keys.length; i < l; i++ ) {
                if ( this.vertexAttribMap._disable[ keys[ i ] ] === true ) {
                    var attr = keys[ i ];
                    this._graphicContext.disableVertexAttribArray( attr );
                    this.vertexAttribMap._disable[ attr ] = false;
                    this.vertexAttribMap[ attr ] = false;
                }
            }

            // it takes 4.26% of global cpu
            // there would be a way to cache it and track state if the program has not changed ...
            var program = this.programs.lastApplied;

            if ( program !== undefined ) {
                var updateColorUniform = false;
                var hasColorAttrib = false;
                if ( program.attributesCache.Color !== undefined ) {
                    hasColorAttrib = this.vertexAttribMap[ program.attributesCache.Color ];
                }
                var uniform = this.uniforms.ArrayColorEnabled.globalDefault;
                if ( this.previousHasColorAttrib !== hasColorAttrib ) {
                    updateColorUniform = true;
                }

                this.previousHasColorAttrib = hasColorAttrib;

                if ( updateColorUniform ) {
                    if ( hasColorAttrib ) {
                        uniform.get()[ 0 ] = 1.0;
                    } else {
                        uniform.get()[ 0 ] = 0.0;
                    }
                    uniform.dirty();
                }
                //Notify.log(uniform.get()[0]);
                uniform.apply( program.uniformsCache.ArrayColorEnabled );
            }
        },
        setVertexAttribArray: function ( attrib, array, normalize ) {
            var vertexAttribMap = this.vertexAttribMap;
            vertexAttribMap._disable[ attrib ] = false;
            var gl = this._graphicContext;
            var binded = false;
            if ( array.isDirty() ) {
                array.bind( gl );
                array.compile( gl );
                binded = true;
            }

            if ( vertexAttribMap[ attrib ] !== array ) {

                if ( !binded ) {
                    array.bind( gl );
                }

                if ( !vertexAttribMap[ attrib ] ) {
                    gl.enableVertexAttribArray( attrib );

                    if ( vertexAttribMap[ attrib ] === undefined ) {
                        vertexAttribMap._keys.push( attrib );
                    }
                }

                vertexAttribMap[ attrib ] = array;
                gl.vertexAttribPointer( attrib, array._itemSize, gl.FLOAT, normalize, 0, 0 );
            }
        }

    };

    return State;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/StateAttribute',
    'osg/Object'
], function ( MACROUTILS, StateAttribute, Object ) {

    /**
     * StateSet encapsulate StateAttribute
     * @class StateSet
     */
    var StateSet = function () {
        Object.call( this );
        this.id = StateSet.instance++;
        this.attributeMap = {};
        this.attributeMap.attributeKeys = [];

        this.textureAttributeMapList = [];

        this._binName = undefined;
        this._binNumber = 0;

        this._shaderGenerator = undefined;
    };
    StateSet.instance = 0;

    StateSet.AttributePair = function ( attr, value ) {
        this._object = attr;
        this._value = value;
    };
    StateSet.AttributePair.prototype = {
        getAttribute: function () {
            return this._object;
        },
        getUniform: function () {
            return this._object;
        },
        getValue: function () {
            return this._value;
        }
    };

    /** @lends StateSet.prototype */
    StateSet.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( Object.prototype, {
        getAttributePair: function ( attribute, value ) {
            return new StateSet.AttributePair( attribute, value );
        },
        addUniform: function ( uniform, mode ) {
            if ( mode === undefined ) {
                mode = StateAttribute.ON;
            }
            if ( !this.uniforms ) {
                this.uniforms = {};
                this.uniforms.uniformKeys = [];
            }
            var name = uniform.name;
            this.uniforms[ name ] = this.getAttributePair( uniform, mode );
            if ( this.uniforms.uniformKeys.indexOf( name ) === -1 ) {
                this.uniforms.uniformKeys.push( name );
            }
        },
        getUniform: function ( uniform ) {
            if ( this.uniforms && this.uniforms[ uniform ] ) {
                return this.uniforms[ uniform ].getAttribute();
            }
            return undefined;
        },
        getUniformList: function () {
            return this.uniforms;
        },

        setTextureAttributeAndMode: function ( unit, attribute, mode ) {
            if ( mode === undefined ) {
                mode = StateAttribute.ON;
            }
            this._setTextureAttribute( unit, this.getAttributePair( attribute, mode ) );
        },
        getNumTextureAttributeLists: function () {
            return this.textureAttributeMapList.length;
        },
        getTextureAttribute: function ( unit, attribute ) {
            if ( this.textureAttributeMapList[ unit ] === undefined || this.textureAttributeMapList[ unit ][ attribute ] === undefined ) {
                return undefined;
            }
            return this.textureAttributeMapList[ unit ][ attribute ].getAttribute();
        },

        removeTextureAttribute: function ( unit, attributeName ) {
            if ( this.textureAttributeMapList[ unit ] === undefined || this.textureAttributeMapList[ unit ][ attributeName ] === undefined ) {
                return;
            }

            delete this.textureAttributeMapList[ unit ][ attributeName ];
            var idx = this.textureAttributeMapList[ unit ].attributeKeys.indexOf( attributeName );
            this.textureAttributeMapList[ unit ].attributeKeys.splice( idx, 1 );
        },

        getAttribute: function ( attributeType ) {
            if ( this.attributeMap[ attributeType ] === undefined ) {
                return undefined;
            }
            return this.attributeMap[ attributeType ].getAttribute();
        },
        setAttributeAndMode: function ( attribute, mode ) {
            if ( mode === undefined ) {
                mode = StateAttribute.ON;
            }
            this._setAttribute( this.getAttributePair( attribute, mode ) );
        },
        setAttribute: function ( attribute, mode ) {
            if ( mode === undefined ) {
                mode = StateAttribute.ON;
            }
            this._setAttribute( this.getAttributePair( attribute, mode ) );
        },

        removeAttribute: function ( attributeName ) {
            if ( this.attributeMap[ attributeName ] !== undefined ) {
                delete this.attributeMap[ attributeName ];
                var idx = this.attributeMap.attributeKeys.indexOf( attributeName );
                this.attributeMap.attributeKeys.splice( idx, 1 );
            }
        },

        setRenderingHint: function ( hint ) {
            if ( hint === 'OPAQUE_BIN' ) {
                this.setRenderBinDetails( 0, 'RenderBin' );
            } else if ( hint === 'TRANSPARENT_BIN' ) {
                this.setRenderBinDetails( 10, 'DepthSortedBin' );
            } else {
                this.setRenderBinDetails( 0, '' );
            }
        },

        setRenderBinDetails: function ( num, binName ) {
            this._binNumber = num;
            this._binName = binName;
        },
        getAttributeMap: function () {
            return this.attributeMap;
        },
        getBinNumber: function () {
            return this._binNumber;
        },
        getBinName: function () {
            return this._binName;
        },
        setBinNumber: function ( binNum ) {
            this._binNumber = binNum;
        },
        setBinName: function ( binName ) {
            this._binName = binName;
        },
        getAttributeList: function () {
            var attributes = this.attributeMap;
            var keys = attributes.attributeKeys;
            var l = keys.length;
            var list = new Array( l );
            for ( var i = 0; i < l; i++ ) {
                list[ i ] = attributes[ keys[ i ] ];
            }
            return list;
        },
        setShaderGenerator: function ( generator ) {
            this._shaderGenerator = generator;
        },
        getShaderGenerator: function () {
            return this._shaderGenerator;
        },
        _getUniformMap: function () {
            return this.uniforms;
        },

        // for internal use, you should not call it directly
        _setTextureAttribute: function ( unit, attributePair ) {
            if ( this.textureAttributeMapList[ unit ] === undefined ) {
                this.textureAttributeMapList[ unit ] = {};
                this.textureAttributeMapList[ unit ].attributeKeys = [];
            }
            var name = attributePair.getAttribute().getTypeMember();
            this.textureAttributeMapList[ unit ][ name ] = attributePair;
            if ( this.textureAttributeMapList[ unit ].attributeKeys.indexOf( name ) === -1 ) {
                this.textureAttributeMapList[ unit ].attributeKeys.push( name );
            }
        },
        // for internal use, you should not call it directly
        _setAttribute: function ( attributePair ) {
            var name = attributePair.getAttribute().getTypeMember();
            this.attributeMap[ name ] = attributePair;
            if ( this.attributeMap.attributeKeys.indexOf( name ) === -1 ) {
                this.attributeMap.attributeKeys.push( name );
            }
        }

    } ), 'osg', 'StateSet' );
    StateSet.prototype.setTextureAttributeAndModes = StateSet.prototype.setTextureAttributeAndMode;
    StateSet.prototype.setAttributeAndModes = StateSet.prototype.setAttributeAndMode;

    return StateSet;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Object'
], function ( MACROUTILS, Object ) {

    var Image = function ( image ) {
        Object.call( this );

        this._imageObject = undefined;
        this._url = undefined;
        this._width = undefined;
        this._height = undefined;

        if ( image ) {
            this.setImage( image );
        }

        this._isGreyscale = undefined;
    };

    Image.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInherit( Object.prototype, {

        dirty: function () {
            this._isGreyscale = undefined;
        },
        getImage: function () {
            return this._imageObject;
        },
        getURL: function () {
            return this._url;
        },
        setURL: function ( url ) {
            this._url = url;
        },
        setImage: function ( img ) {
            if ( !this._url && img && img.src ) {
                this._url = img.src;
            }
            this._imageObject = img;
            this.dirty();
        },
        isCanvas: function () {
            return this._imageObject instanceof HTMLCanvasElement;
        },
        isImage: function () {
            return this._imageObject instanceof window.Image;
        },
        isTypedArray: function () {
            return this._imageObject instanceof Uint8Array;
        },
        setWidth: function ( w ) {
            this._width = w;
        },
        setHeight: function ( h ) {
            this._height = h;
        },
        getWidth: function () {
            if ( this.isImage() ) {
                return this._imageObject.naturalWidth;
            } else if ( this.isCanvas() ) {
                return this._imageObject.width;
            }
            return this._width;
        },
        getHeight: function () {
            if ( this.isImage() ) {
                return this._imageObject.naturalHeight;
            } else if ( this.isCanvas() ) {
                return this._imageObject.height;
            }
            return this._height;
        },

        isGreyscale: function () {
            if ( this._isGreyscale !== undefined )
                return this._isGreyscale;

            if ( this._imageObject !== undefined &&
                this.isReady() &&
                this._isGreyscale === undefined ) {

                var canvas = this._imageObject;
                if ( !this.isCanvas() ) {

                    canvas = document.createElement( 'canvas' );
                }
                var ctx = canvas.getContext( '2d' );
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage( img, 0, 0 );

                var data = ctx.getImageData( 0, 0, 1, 1 ).data;
                var isGreyscale = ( data[ 0 ] == data[ 1 ] ) && ( data[ 1 ] == data[ 2 ] );
                this._isGreyscale = isGreyscale;
            }
            return this._isGreyscale;
        },

        isReady: function () {

            // image are ready for static data
            if ( this.isCanvas() ||
                this.isTypedArray() ) {
                return true;
            }

            if ( this.isImage() ) {
                var image = this._imageObject;
                if ( image.complete ) {
                    if ( image.naturalWidth !== undefined && image.naturalWidth === 0 ) {
                        return false;
                    }
                    return true;
                }
            }
            return false;
        }
    } ), 'osg', 'Image' );

    Image.prototype.objectType = MACROUTILS.objectType.generate( 'Image' );

    return Image;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/StateAttribute',
    'osg/Uniform',
    'osg/Image',
    'osg/ShaderGenerator',
    'osgDB/osgDB',
    'vendors/Q'
], function ( Notify, MACROUTILS, StateAttribute, Uniform, Image, ShaderGenerator, osgDB, Q ) {

    /** -*- compile-command: 'jslint-cli Texture.js' -*- */

    /**
     * Texture encapsulate webgl texture object
     * @class Texture
     * @inherits StateAttribute
     */
    var Texture = function () {
        StateAttribute.call( this );
        this.setDefaultParameters();
        this._applyTexImage2DCallbacks = [];
    };
    Texture.DEPTH_COMPONENT = 0x1902;
    Texture.ALPHA = 0x1906;
    Texture.RGB = 0x1907;
    Texture.RGBA = 0x1908;
    Texture.LUMINANCE = 0x1909;
    Texture.LUMINANCE_ALPHA = 0x190A;

    // filter mode
    Texture.LINEAR = 0x2601;
    Texture.NEAREST = 0x2600;
    Texture.NEAREST_MIPMAP_NEAREST = 0x2700;
    Texture.LINEAR_MIPMAP_NEAREST = 0x2701;
    Texture.NEAREST_MIPMAP_LINEAR = 0x2702;
    Texture.LINEAR_MIPMAP_LINEAR = 0x2703;

    // wrap mode
    Texture.CLAMP_TO_EDGE = 0x812F;
    Texture.REPEAT = 0x2901;
    Texture.MIRRORED_REPEAT = 0x8370;

    // target
    Texture.TEXTURE_2D = 0x0DE1;
    Texture.TEXTURE_CUBE_MAP = 0x8513;
    Texture.TEXTURE_BINDING_CUBE_MAP = 0x8514;
    Texture.TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
    Texture.TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
    Texture.TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
    Texture.TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
    Texture.TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
    Texture.TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
    Texture.MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;

    Texture.UNSIGNED_BYTE = 0x1401;
    Texture.FLOAT = 0x1406;


    /** @lends Texture.prototype */
    Texture.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {
        attributeType: 'Texture',
        cloneType: function () {
            var t = new Texture();
            t.default_type = true;
            return t;
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType;
        },
        getOrCreateUniforms: function ( unit ) {
            if ( Texture.uniforms === undefined ) {
                Texture.uniforms = [];
            }
            if ( Texture.uniforms[ unit ] === undefined ) {
                var name = this.getType() + unit;
                var uniforms = {};
                uniforms.texture = Uniform.createInt1( unit, name );
                uniforms.uniformKeys = Object.keys( uniforms );
                Texture.uniforms[ unit ] = uniforms;
            }
            // uniform for an texture attribute should directly in Texture.uniforms[unit] and not in Texture.uniforms[unit][Texture0]
            return Texture.uniforms[ unit ];
        },
        setDefaultParameters: function () {
            this._image = undefined;
            this._magFilter = Texture.LINEAR;
            this._minFilter = Texture.LINEAR;
            this._wrapS = Texture.CLAMP_TO_EDGE;
            this._wrapT = Texture.CLAMP_TO_EDGE;
            this._textureWidth = 0;
            this._textureHeight = 0;
            this._unrefImageDataAfterApply = false;
            this.setInternalFormat( Texture.RGBA );
            this._textureTarget = Texture.TEXTURE_2D;
            this._type = Texture.UNSIGNED_BYTE;
        },
        getTextureTarget: function () {
            return this._textureTarget;
        },
        getTextureObject: function () {
            return this._textureObject;
        },
        setTextureSize: function ( w, h ) {
            this._textureWidth = w;
            this._textureHeight = h;
        },
        init: function ( gl ) {
            if ( !this._textureObject ) {
                this._textureObject = gl.createTexture();
                this.dirty();
            }
        },
        addApplyTexImage2DCallback: function ( callback ) {
            var index = this._applyTexImage2DCallbacks.indexOf( callback );
            if ( index < 0 ) {
                this._applyTexImage2DCallbacks.push( callback );
            }
        },
        removeApplyTexImage2DCallback: function ( callback ) {
            var index = this._applyTexImage2DCallbacks.indexOf( callback );
            if ( index >= 0 ) {
                this._applyTexImage2DCallbacks.splice( index, 1 );
            }
        },
        getWidth: function () {
            return this._textureWidth;
        },
        getHeight: function () {
            return this._textureHeight;
        },
        releaseGLObjects: function ( gl ) {
            if ( this._textureObject !== undefined && this._textureObject !== null ) {
                gl.deleteTexture( this._textureObject );
                this._textureObject = null;
                this._image = undefined;
            }
        },
        setWrapS: function ( value ) {
            if ( typeof ( value ) === 'string' ) {
                this._wrapS = Texture[ value ];
            } else {
                this._wrapS = value;
            }
        },
        setWrapT: function ( value ) {
            if ( typeof ( value ) === 'string' ) {
                this._wrapT = Texture[ value ];
            } else {
                this._wrapT = value;
            }
        },

        getWrapT: function () {
            return this._wrapT;
        },
        getWrapS: function () {
            return this._wrapS;
        },
        getMinFilter: function ( value ) {
            return this._minFilter;
        },
        getMagFilter: function ( value ) {
            return this._magFilter;
        },

        setMinFilter: function ( value ) {
            if ( typeof ( value ) === 'string' ) {
                this._minFilter = Texture[ value ];
            } else {
                this._minFilter = value;
            }
        },
        setMagFilter: function ( value ) {
            if ( typeof ( value ) === 'string' ) {
                this._magFilter = Texture[ value ];
            } else {
                this._magFilter = value;
            }
        },

        setImage: function ( img, imageFormat ) {

            var image = img;
            if ( img instanceof window.Image ||
                img instanceof HTMLCanvasElement ||
                img instanceof Uint8Array ) {
                image = new Image( img );
            }

            this._image = image;
            this.setImageFormat( imageFormat );
            this.dirty();
        },
        getImage: function () {
            return this._image;
        },
        setImageFormat: function ( imageFormat ) {
            if ( imageFormat ) {
                if ( typeof ( imageFormat ) === 'string' ) {
                    imageFormat = Texture[ imageFormat ];
                }
                this._imageFormat = imageFormat;
            } else {
                this._imageFormat = Texture.RGBA;
            }
            this.setInternalFormat( this._imageFormat );
        },
        setType: function ( value ) {
            if ( typeof ( value ) === 'string' ) {
                this._type = Texture[ value ];
            } else {
                this._type = value;
            }
        },
        setUnrefImageDataAfterApply: function ( bool ) {
            this._unrefImageDataAfterApply = bool;
        },
        setInternalFormat: function ( internalFormat ) {
            this._internalFormat = internalFormat;
        },
        getInternalFormat: function () {
            return this._internalFormat;
        },

        applyFilterParameter: function ( gl, target ) {
            var isPowerOf2 = function ( x ) {
                return ( ( x !== 0 ) && ( ( x & ( ~x + 1 ) ) === x ) );
            };

            var powerOfTwo = isPowerOf2( this._textureWidth ) && isPowerOf2( this._textureHeight );
            if ( !powerOfTwo ) {
                this.setWrapT( Texture.CLAMP_TO_EDGE );
                this.setWrapS( Texture.CLAMP_TO_EDGE );

                if ( this._minFilter === Texture.LINEAR_MIPMAP_LINEAR ||
                    this._minFilter === Texture.LINEAR_MIPMAP_NEAREST ) {
                    this.setMinFilter( Texture.LINEAR );
                }
            }

            gl.texParameteri( target, gl.TEXTURE_MAG_FILTER, this._magFilter );
            gl.texParameteri( target, gl.TEXTURE_MIN_FILTER, this._minFilter );
            gl.texParameteri( target, gl.TEXTURE_WRAP_S, this._wrapS );
            gl.texParameteri( target, gl.TEXTURE_WRAP_T, this._wrapT );
        },

        generateMipmap: function ( gl, target ) {
            if ( this._minFilter === gl.NEAREST_MIPMAP_NEAREST ||
                this._minFilter === gl.LINEAR_MIPMAP_NEAREST ||
                this._minFilter === gl.NEAREST_MIPMAP_LINEAR ||
                this._minFilter === gl.LINEAR_MIPMAP_LINEAR ) {
                gl.generateMipmap( target );
            }
        },
        applyTexImage2D: function ( gl ) {
            var gl = arguments[ 0 ];
            var args = Array.prototype.slice.call( arguments, 1 );
            gl.texImage2D.apply( gl, args );

            // call a callback when upload is done if there is one
            var numCallback = this._applyTexImage2DCallbacks.length;
            if ( numCallback > 0 ) {
                for ( var i = 0, l = numCallback; i < l; i++ ) {
                    this._applyTexImage2DCallbacks[ i ].call( this );
                }
            }
        },

        apply: function ( state ) {
            var gl = state.getGraphicContext();
            if ( this._textureObject !== undefined && !this.isDirty() ) {
                gl.bindTexture( this._textureTarget, this._textureObject );
            } else if ( this.default_type ) {
                gl.bindTexture( this._textureTarget, null );
            } else {
                var image = this._image;
                if ( image !== undefined ) {

                    // when data is ready we will upload it to the gpu
                    if ( image.isReady() ) {

                        if ( !this._textureObject ) {
                            this.init( gl );
                        }

                        this.setDirty( false );
                        gl.bindTexture( this._textureTarget, this._textureObject );

                        var imgWidth = image.getWidth() || this._textureWidth;
                        var imgHeight = image.getHeight() || this._textureHeight;

                        this.setTextureSize( imgWidth, imgHeight );
                        if ( image.isTypedArray() ) {
                            this.applyTexImage2D( gl,
                                this._textureTarget,
                                0,
                                this._internalFormat,
                                this._textureWidth,
                                this._textureHeight,
                                0,
                                this._internalFormat,
                                this._type,
                                this._image.getImage() );
                        } else {
                            this.applyTexImage2D( gl,
                                this._textureTarget,
                                0,
                                this._internalFormat,
                                this._imageFormat,
                                this._type,
                                image.getImage() );
                        }

                        this.applyFilterParameter( gl, this._textureTarget );
                        this.generateMipmap( gl, this._textureTarget );

                        if ( this._unrefImageDataAfterApply ) {
                            this._image = undefined;
                        }

                    } else {
                        gl.bindTexture( this._textureTarget, null );
                    }

                } else if ( this._textureHeight !== 0 && this._textureWidth !== 0 ) {
                    if ( !this._textureObject ) {
                        this.init( gl );
                    }
                    gl.bindTexture( this._textureTarget, this._textureObject );
                    this.applyTexImage2D( gl, this._textureTarget, 0, this._internalFormat, this._textureWidth, this._textureHeight, 0, this._internalFormat, this._type, null );

                    this.applyFilterParameter( gl, this._textureTarget );
                    this.generateMipmap( gl, this._textureTarget );
                    this.setDirty( false );
                }
            }
        },


        /**
      set the injection code that will be used in the shader generation
      for FragmentMain part we would write something like that
      @example
      var fragmentGenerator = function(unit) {
          var str = 'texColor' + unit + ' = texture2D( Texture' + unit + ', FragTexCoord' + unit + '.xy );\n';
          str += 'fragColor = fragColor * texColor' + unit + ';\n';
      };
      setShaderGeneratorFunction(fragmentGenerator, ShaderGenerator.Type.FragmentMain);

    */
        setShaderGeneratorFunction: function (
            /**Function*/
            injectionFunction,
            /**ShaderGenerator.Type*/
            mode ) {
            this[ mode ] = injectionFunction;
        },

        generateShader: function ( unit, type ) {
            if ( this[ type ] ) {
                return this[ type ].call( this, unit );
            }
            return '';
        }
    } ), 'osg', 'Texture' );

    Texture.prototype[ ShaderGenerator.Type.VertexInit ] = function ( unit ) {
        var str = 'attribute vec2 TexCoord' + unit + ';\n';
        str += 'varying vec2 FragTexCoord' + unit + ';\n';
        return str;
    };
    Texture.prototype[ ShaderGenerator.Type.VertexMain ] = function ( unit ) {
        return 'FragTexCoord' + unit + ' = TexCoord' + unit + ';\n';
    };
    Texture.prototype[ ShaderGenerator.Type.FragmentInit ] = function ( unit ) {
        var str = 'varying vec2 FragTexCoord' + unit + ';\n';
        str += 'uniform sampler2D Texture' + unit + ';\n';
        str += 'vec4 texColor' + unit + ';\n';
        return str;
    };
    Texture.prototype[ ShaderGenerator.Type.FragmentMain ] = function ( unit ) {
        var str = 'texColor' + unit + ' = texture2D( Texture' + unit + ', FragTexCoord' + unit + '.xy );\n';
        str += 'fragColor = fragColor * texColor' + unit + ';\n';
        return str;
    };


    Texture.createFromURL = function ( imageSource, format ) {
        var texture = new Texture();
        Q.when( osgDB.readImage( imageSource ) ).then(
            function ( img ) {
                texture.setImage( img, format );
            }
        );
        return texture;
    };

    Texture.createFromImage = function ( image, format ) {
        var a = new Texture();
        a.setImage( image, format );
        return a;
    };

    Texture.createFromCanvas = function ( canvas, format ) {
        return Texture.createFromImage( canvas, format );
    };

    Texture.create = function ( url ) {
        Notify.log( 'Texture.create is deprecated, use Texture.createFromURL instead' );
        return Texture.createFromURL( url );
    };

    return Texture;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Texture',
    'osg/Image'
], function ( MACROUTILS, Texture, Image ) {
    /** 
     * TextureCubeMap
     * @class TextureCubeMap
     * @inherits Texture
     */
    var TextureCubeMap = function () {
        Texture.call( this );
        this._images = {};
    };

    /** @lends TextureCubeMap.prototype */
    TextureCubeMap.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( Texture.prototype, {
        setDefaultParameters: function () {
            Texture.prototype.setDefaultParameters.call( this );
            this._textureTarget = Texture.TEXTURE_CUBE_MAP;
        },
        cloneType: function () {
            var t = new TextureCubeMap();
            t.default_type = true;
            return t;
        },
        setImage: function ( face, img, imageFormat ) {

            if ( typeof ( face ) === 'string' ) {
                face = Texture[ face ];
            }

            if ( this._images[ face ] === undefined ) {
                this._images[ face ] = {};
            }

            if ( typeof ( imageFormat ) === 'string' ) {
                imageFormat = Texture[ imageFormat ];
            }
            if ( imageFormat === undefined ) {
                imageFormat = Texture.RGBA;
            }

            var image = img;
            if ( image instanceof( Image ) === false ) {
                image = new Image( img );
            }

            this._images[ face ].image = image;
            this._images[ face ].format = imageFormat;
            this._images[ face ].dirty = true;
            this.dirty();
        },
        getImage: function ( face ) {
            return this._images[ face ].image;
        },

        applyTexImage2D_load: function ( gl, target, level, internalFormat, format, type, image ) {
            if ( !image ) {
                return false;
            }

            if ( !image.isReady() ) {
                return false;
            }


            this.setTextureSize( image.getWidth(), image.getHeight() );

            gl.texImage2D( target, 0, internalFormat, format, type, image.getImage() );
            return true;
        },

        _applyImageTarget: function ( gl, internalFormat, target ) {
            var imgObject = this._images[ target ];
            if ( !imgObject ) {
                return 0;
            }

            if ( !imgObject.dirty ) {
                return 1;
            }

            if ( this.applyTexImage2D_load( gl,
                target,
                0,
                internalFormat,
                imgObject.format,
                gl.UNSIGNED_BYTE,
                imgObject.image ) ) {
                imgObject.dirty = false;
                if ( this._unrefImageDataAfterApply ) {
                    delete this._images[ target ];
                }
                return 1;
            }
            return 0;
        },

        apply: function ( state ) {
            var gl = state.getGraphicContext();

            if ( this._textureObject !== undefined && !this.isDirty() ) {
                gl.bindTexture( this._textureTarget, this._textureObject );

            } else if ( this.default_type ) {
                gl.bindTexture( this._textureTarget, null );

            } else {
                var images = this._images;
                if ( !this._textureObject ) {
                    this.init( gl );
                }
                gl.bindTexture( this._textureTarget, this._textureObject );

                var internalFormat = this._internalFormat;

                var valid = 0;
                valid += this._applyImageTarget( gl, internalFormat, gl.TEXTURE_CUBE_MAP_POSITIVE_X );
                valid += this._applyImageTarget( gl, internalFormat, gl.TEXTURE_CUBE_MAP_NEGATIVE_X );

                valid += this._applyImageTarget( gl, internalFormat, gl.TEXTURE_CUBE_MAP_POSITIVE_Y );
                valid += this._applyImageTarget( gl, internalFormat, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y );

                valid += this._applyImageTarget( gl, internalFormat, gl.TEXTURE_CUBE_MAP_POSITIVE_Z );
                valid += this._applyImageTarget( gl, internalFormat, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z );
                if ( valid === 6 ) {
                    this.setDirty( false );
                    this.applyFilterParameter( gl, this._textureTarget );
                    this.generateMipmap( gl, this._textureTarget );
                }
            } // render to cubemap not yet implemented
        }
    } ), 'osg', 'TextureCubeMap' );

    return TextureCubeMap;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/NodeVisitor',
    'osg/FrameStamp'
], function ( MACROUTILS, NodeVisitor, FrameStamp ) {

    var UpdateVisitor = function () {
        NodeVisitor.call( this );
        var framestamp = new FrameStamp();
        this.getFrameStamp = function () {
            return framestamp;
        };
        this.setFrameStamp = function ( s ) {
            framestamp = s;
        };
    };
    UpdateVisitor.prototype = MACROUTILS.objectInehrit( NodeVisitor.prototype, {
        apply: function ( node ) {
            var ncs = node.getUpdateCallbackList();
            for ( var i = 0; i < ncs.length; i++ ) {
                if ( !ncs[ i ].update( node, this ) ) {
                    return;
                }
            }
            this.traverse( node );
        }
    } );

    return UpdateVisitor;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/StateAttribute',
    'osg/Matrix',
    'osg/Viewport'
], function ( MACROUTILS, StateAttribute, Matrix, Viewport ) {

    var Viewport = function ( x, y, w, h ) {
        StateAttribute.call( this );

        if ( x === undefined ) {
            x = 0;
        }
        if ( y === undefined ) {
            y = 0;
        }
        if ( w === undefined ) {
            w = 800;
        }
        if ( h === undefined ) {
            h = 600;
        }

        this._x = x;
        this._y = y;
        this._width = w;
        this._height = h;
        this._dirty = true;
    };

    Viewport.prototype = MACROUTILS.objectLibraryClass( MACROUTILS.objectInehrit( StateAttribute.prototype, {
        attributeType: 'Viewport',
        cloneType: function () {
            return new Viewport();
        },
        getType: function () {
            return this.attributeType;
        },
        getTypeMember: function () {
            return this.attributeType;
        },
        apply: function ( state ) {
            var gl = state.getGraphicContext();
            gl.viewport( this._x, this._y, this._width, this._height );
            this._dirty = false;
        },
        setViewport: function ( x, y, width, height ) {
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this.dirty();
        },
        x: function () {
            return this._x;
        },
        y: function () {
            return this._y;
        },
        width: function () {
            return this._width;
        },
        height: function () {
            return this._height;
        },
        computeWindowMatrix: function () {
            // res = Matrix offset * Matrix scale * Matrix translate
            var translate = Matrix.makeTranslate( 1.0, 1.0, 1.0 );
            var scale = Matrix.makeScale( 0.5 * this._width, 0.5 * this._height, 0.5 );
            var offset = Matrix.makeTranslate( this._x, this._y, 0.0 );
            //return Matrix.mult(Matrix.mult(translate, scale, translate), offset, offset);
            return Matrix.preMult( offset, Matrix.preMult( scale, translate ) );
        }
    } ), 'osg', 'Viewport' );

    return Viewport;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/NodeVisitor',
    'osg/CullSettings',
    'osg/CullStack',
    'osg/Matrix',
    'osg/MatrixTransform',
    'osg/Projection',
    'osg/LightSource',
    'osg/Geometry',
    'osg/RenderStage',
    'osg/Node',
    'osg/Transform',
    'osg/Camera'
], function ( Notify, MACROUTILS, NodeVisitor, CullSettings, CullStack, Matrix, MatrixTransform, Projection, LightSource, Geometry, RenderStage, Node, Transform, Camera ) {

    /** 
     * CullVisitor traverse the tree and collect Matrix/State for the rendering traverse
     * @class CullVisitor
     */
    var CullVisitor = function () {
        NodeVisitor.call( this );
        CullSettings.call( this );
        CullStack.call( this );

        this._rootStateGraph = undefined;
        this._currentStateGraph = undefined;
        this._currentRenderBin = undefined;
        this._currentRenderStage = undefined;
        this._rootRenderStage = undefined;

        this._computedNear = Number.POSITIVE_INFINITY;
        this._computedFar = Number.NEGATIVE_INFINITY;

        var lookVector = [ 0.0, 0.0, -1.0 ];
        this._bbCornerFar = ( lookVector[ 0 ] >= 0 ? 1 : 0 ) | ( lookVector[ 1 ] >= 0 ? 2 : 0 ) | ( lookVector[ 2 ] >= 0 ? 4 : 0 );
        this._bbCornerNear = ( ~this._bbCornerFar ) & 7;


        // keep a matrix in memory to avoid to create matrix
        this._reserveMatrixStack = [
            []
        ];
        this._reserveMatrixStack.current = 0;

        this._reserveLeafStack = [ {} ];
        this._reserveLeafStack.current = 0;

        this._renderBinStack = [];
    };

    /** @lends CullVisitor.prototype */
    CullVisitor.prototype = MACROUTILS.objectInehrit( CullStack.prototype, MACROUTILS.objectInehrit( CullSettings.prototype, MACROUTILS.objectInehrit( NodeVisitor.prototype, {
        distance: function ( coord, matrix ) {
            return -( coord[ 0 ] * matrix[ 2 ] + coord[ 1 ] * matrix[ 6 ] + coord[ 2 ] * matrix[ 10 ] + matrix[ 14 ] );
        },

        handleCullCallbacksAndTraverse: function ( node ) {
            var ccb = node.getCullCallback();
            if ( ccb ) {
                if ( !ccb.cull( node, this ) ) {
                    return;
                }
            }
            this.traverse( node );
        },

        updateCalculatedNearFar: function ( matrix, drawable ) {

            var bb = drawable.getBoundingBox();
            var d_near, d_far;

            // efficient computation of near and far, only taking into account the nearest and furthest
            // corners of the bounding box.
            d_near = this.distance( bb.corner( this._bbCornerNear ), matrix );
            d_far = this.distance( bb.corner( this._bbCornerFar ), matrix );

            if ( d_near > d_far ) {
                var tmp = d_near;
                d_near = d_far;
                d_far = tmp;
            }

            if ( d_far < 0.0 ) {
                // whole object behind the eye point so discard
                return false;
            }

            if ( d_near < this._computedNear ) {
                this._computedNear = d_near;
            }

            if ( d_far > this._computedFar ) {
                this._computedFar = d_far;
            }

            return true;
        },

        clampProjectionMatrix: function ( projection, znear, zfar, nearFarRatio, resultNearFar ) {
            var epsilon = 1e-6;
            if ( zfar < znear - epsilon ) {
                Notify.log( 'clampProjectionMatrix not applied, invalid depth range, znear = ' + znear + '  zfar = ' + zfar );
                return false;
            }

            var desired_znear, desired_zfar;
            if ( zfar < znear + epsilon ) {
                // znear and zfar are too close together and could cause divide by zero problems
                // late on in the clamping code, so move the znear and zfar apart.
                var average = ( znear + zfar ) * 0.5;
                znear = average - epsilon;
                zfar = average + epsilon;
                // OSG_INFO << '_clampProjectionMatrix widening znear and zfar to '<<znear<<' '<<zfar<<std::endl;
            }

            if ( Math.abs( Matrix.get( projection, 0, 3 ) ) < epsilon &&
                Math.abs( Matrix.get( projection, 1, 3 ) ) < epsilon &&
                Math.abs( Matrix.get( projection, 2, 3 ) ) < epsilon ) {
                // OSG_INFO << 'Orthographic matrix before clamping'<<projection<<std::endl;

                var delta_span = ( zfar - znear ) * 0.02;
                if ( delta_span < 1.0 ) {
                    delta_span = 1.0;
                }
                desired_znear = znear - delta_span;
                desired_zfar = zfar + delta_span;

                // assign the clamped values back to the computed values.
                znear = desired_znear;
                zfar = desired_zfar;

                Matrix.set( projection, 2, 2, -2.0 / ( desired_zfar - desired_znear ) );
                Matrix.set( projection, 3, 2, -( desired_zfar + desired_znear ) / ( desired_zfar - desired_znear ) );

                // OSG_INFO << 'Orthographic matrix after clamping '<<projection<<std::endl;
            } else {

                // OSG_INFO << 'Persepective matrix before clamping'<<projection<<std::endl;
                //std::cout << '_computed_znear'<<_computed_znear<<std::endl;
                //std::cout << '_computed_zfar'<<_computed_zfar<<std::endl;

                var zfarPushRatio = 1.02;
                var znearPullRatio = 0.98;

                //znearPullRatio = 0.99; 

                desired_znear = znear * znearPullRatio;
                desired_zfar = zfar * zfarPushRatio;

                // near plane clamping.
                var min_near_plane = zfar * nearFarRatio;
                if ( desired_znear < min_near_plane ) {
                    desired_znear = min_near_plane;
                }

                // assign the clamped values back to the computed values.
                znear = desired_znear;
                zfar = desired_zfar;

                var m22 = Matrix.get( projection, 2, 2 );
                var m32 = Matrix.get( projection, 3, 2 );
                var m23 = Matrix.get( projection, 2, 3 );
                var m33 = Matrix.get( projection, 3, 3 );
                var trans_near_plane = ( -desired_znear * m22 + m32 ) / ( -desired_znear * m23 + m33 );
                var trans_far_plane = ( -desired_zfar * m22 + m32 ) / ( -desired_zfar * m23 + m33 );

                var ratio = Math.abs( 2.0 / ( trans_near_plane - trans_far_plane ) );
                var center = -( trans_near_plane + trans_far_plane ) / 2.0;

                var matrix = [ 1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, ratio, 0.0,
                    0.0, 0.0, center * ratio, 1.0
                ];
                Matrix.postMult( matrix, projection );
                // OSG_INFO << 'Persepective matrix after clamping'<<projection<<std::endl;
            }
            if ( resultNearFar !== undefined ) {
                resultNearFar[ 0 ] = znear;
                resultNearFar[ 1 ] = zfar;
            }
            return true;
        },

        setStateGraph: function ( sg ) {
            this._rootStateGraph = sg;
            this._currentStateGraph = sg;
        },
        setRenderStage: function ( rg ) {
            this._rootRenderStage = rg;
            this._currentRenderBin = rg;
        },
        reset: function () {
            //this._modelviewMatrixStack.length = 0;
            this._modelviewMatrixStack.splice( 0, this._modelviewMatrixStack.length );
            //this._projectionMatrixStack.length = 0;
            this._projectionMatrixStack.splice( 0, this._projectionMatrixStack.length );
            this._reserveMatrixStack.current = 0;
            this._reserveLeafStack.current = 0;

            this._computedNear = Number.POSITIVE_INFINITY;
            this._computedFar = Number.NEGATIVE_INFINITY;
        },
        getCurrentRenderBin: function () {
            return this._currentRenderBin;
        },
        setCurrentRenderBin: function ( rb ) {
            this._currentRenderBin = rb;
        },
        addPositionedAttribute: function ( attribute ) {
            var matrix = this._modelviewMatrixStack[ this._modelviewMatrixStack.length - 1 ];
            this._currentRenderBin.getStage().positionedAttribute.push( [ matrix, attribute ] );
        },

        pushStateSet: function ( stateset ) {
            this._currentStateGraph = this._currentStateGraph.findOrInsert( stateset );
            if ( stateset.getBinName() !== undefined ) {
                var renderBinStack = this._renderBinStack;
                var currentRenderBin = this._currentRenderBin;
                renderBinStack.push( currentRenderBin );
                this._currentRenderBin = currentRenderBin.getStage().findOrInsert( stateset.getBinNumber(), stateset.getBinName() );
            }
        },

        /** Pop the top state set and hence associated state group.
         * Move the current state group to the parent of the popped
         * state group.
         */
        popStateSet: function () {
            var currentStateGraph = this._currentStateGraph;
            var stateset = currentStateGraph.getStateSet();
            this._currentStateGraph = currentStateGraph.parent;
            if ( stateset.getBinName() !== undefined ) {
                var renderBinStack = this._renderBinStack;
                if ( renderBinStack.length === 0 ) {
                    this._currentRenderBin = this._currentRenderBin.getStage();
                } else {
                    this._currentRenderBin = renderBinStack.pop();
                }
            }
        },

        popProjectionMatrix: function () {
            if ( this._computeNearFar === true && this._computedFar >= this._computedNear ) {
                var m = this._projectionMatrixStack[ this._projectionMatrixStack.length - 1 ];
                this.clampProjectionMatrix( m, this._computedNear, this._computedFar, this._nearFarRatio );
            }
            CullStack.prototype.popProjectionMatrix.call( this );
        },

        apply: function ( node ) {
            this[ node.objectType ].call( this, node );
        },

        _getReservedMatrix: function () {
            var m = this._reserveMatrixStack[ this._reserveMatrixStack.current++ ];
            if ( this._reserveMatrixStack.current === this._reserveMatrixStack.length ) {
                this._reserveMatrixStack.push( Matrix.makeIdentity( [] ) );
            }
            return m;
        },
        _getReservedLeaf: function () {
            var l = this._reserveLeafStack[ this._reserveLeafStack.current++ ];
            if ( this._reserveLeafStack.current === this._reserveLeafStack.length ) {
                this._reserveLeafStack.push( {} );
            }
            return l;
        }
    } ) ) );

    CullVisitor.prototype[ Camera.prototype.objectType ] = function ( camera ) {

        var stateset = camera.getStateSet();
        if ( stateset ) {
            this.pushStateSet( stateset );
        }

        if ( camera.light ) {
            this.addPositionedAttribute( camera.light );
        }

        var originalModelView = this._modelviewMatrixStack[ this._modelviewMatrixStack.length - 1 ];

        var modelview = this._getReservedMatrix();
        var projection = this._getReservedMatrix();

        if ( camera.getReferenceFrame() === Transform.RELATIVE_RF ) {
            var lastProjectionMatrix = this._projectionMatrixStack[ this._projectionMatrixStack.length - 1 ];
            Matrix.mult( lastProjectionMatrix, camera.getProjectionMatrix(), projection );
            var lastViewMatrix = this._modelviewMatrixStack[ this._modelviewMatrixStack.length - 1 ];
            Matrix.mult( lastViewMatrix, camera.getViewMatrix(), modelview );
        } else {
            // absolute
            Matrix.copy( camera.getViewMatrix(), modelview );
            Matrix.copy( camera.getProjectionMatrix(), projection );
        }
        this.pushProjectionMatrix( projection );
        this.pushModelviewMatrix( modelview );

        if ( camera.getViewport() ) {
            this.pushViewport( camera.getViewport() );
        }

        // save current state of the camera
        var previous_znear = this._computedNear;
        var previous_zfar = this._computedFar;
        var previous_cullsettings = new CullSettings();
        previous_cullsettings.setCullSettings( this );

        this._computedNear = Number.POSITIVE_INFINITY;
        this._computedFar = Number.NEGATIVE_INFINITY;
        this.setCullSettings( camera );

        // nested camera
        if ( camera.getRenderOrder() === Camera.NESTED_RENDER ) {

            this.handleCullCallbacksAndTraverse( camera );

        } else {
            // not tested

            var previous_stage = this.getCurrentRenderBin().getStage();

            // use render to texture stage
            var rtts = new RenderStage();
            rtts.setCamera( camera );
            rtts.setClearDepth( camera.getClearDepth() );
            rtts.setClearColor( camera.getClearColor() );

            rtts.setClearMask( camera.getClearMask() );

            var vp;
            if ( camera.getViewport() === undefined ) {
                vp = previous_stage.getViewport();
            } else {
                vp = camera.getViewport();
            }
            rtts.setViewport( vp );

            // skip positional state for now
            // ...

            var previousRenderBin = this.getCurrentRenderBin();

            this.setCurrentRenderBin( rtts );

            this.handleCullCallbacksAndTraverse( camera );

            this.setCurrentRenderBin( previousRenderBin );

            if ( camera.getRenderOrder() === Camera.PRE_RENDER ) {
                this.getCurrentRenderBin().getStage().addPreRenderStage( rtts, camera.renderOrderNum );
            } else {
                this.getCurrentRenderBin().getStage().addPostRenderStage( rtts, camera.renderOrderNum );
            }
        }

        this.popModelviewMatrix();
        this.popProjectionMatrix();

        if ( camera.getViewport() ) {
            this.popViewport();
        }

        // restore previous state of the camera
        this.setCullSettings( previous_cullsettings );
        this._computedNear = previous_znear;
        this._computedFar = previous_zfar;

        if ( stateset ) {
            this.popStateSet();
        }

    };


    CullVisitor.prototype[ MatrixTransform.prototype.objectType ] = function ( node ) {
        var matrix = this._getReservedMatrix();

        if ( node.getReferenceFrame() === Transform.RELATIVE_RF ) {
            var lastMatrixStack = this._modelviewMatrixStack[ this._modelviewMatrixStack.length - 1 ];
            Matrix.mult( lastMatrixStack, node.getMatrix(), matrix );
        } else {
            // absolute
            Matrix.copy( node.getMatrix(), matrix );
        }
        this.pushModelviewMatrix( matrix );


        var stateset = node.getStateSet();
        if ( stateset ) {
            this.pushStateSet( stateset );
        }

        if ( node.light ) {
            this.addPositionedAttribute( node.light );
        }

        this.handleCullCallbacksAndTraverse( node );

        if ( stateset ) {
            this.popStateSet();
        }

        this.popModelviewMatrix();

    };

    CullVisitor.prototype[ Projection.prototype.objectType ] = function ( node ) {
        lastMatrixStack = this._projectionMatrixStack[ this._projectionMatrixStack.length - 1 ];
        var matrix = this._getReservedMatrix();
        Matrix.mult( lastMatrixStack, node.getProjectionMatrix(), matrix );
        this.pushProjectionMatrix( matrix );

        var stateset = node.getStateSet();

        if ( stateset ) {
            this.pushStateSet( stateset );
        }

        this.handleCullCallbacksAndTraverse( node );

        if ( stateset ) {
            this.popStateSet();
        }

        this.popProjectionMatrix();
    };

    CullVisitor.prototype[ Node.prototype.objectType ] = function ( node ) {

        var stateset = node.getStateSet();
        if ( stateset ) {
            this.pushStateSet( stateset );
        }
        if ( node.light ) {
            this.addPositionedAttribute( node.light );
        }

        this.handleCullCallbacksAndTraverse( node );

        if ( stateset ) {
            this.popStateSet();
        }
    };
    CullVisitor.prototype[ LightSource.prototype.objectType ] = function ( node ) {

        var stateset = node.getStateSet();
        if ( stateset ) {
            this.pushStateSet( stateset );
        }

        var light = node.getLight();
        if ( light ) {
            this.addPositionedAttribute( light );
        }

        this.handleCullCallbacksAndTraverse( node );

        if ( stateset ) {
            this.popStateSet();
        }
    };

    CullVisitor.prototype[ Geometry.prototype.objectType ] = function ( node ) {
        var modelview = this._modelviewMatrixStack[ this._modelviewMatrixStack.length - 1 ];
        var bb = node.getBoundingBox();
        if ( this._computeNearFar && bb.valid() ) {
            if ( !this.updateCalculatedNearFar( modelview, node ) ) {
                return;
            }
        }

        var stateset = node.getStateSet();
        if ( stateset ) {
            this.pushStateSet( stateset );
        }

        this.handleCullCallbacksAndTraverse( node );

        var leafs = this._currentStateGraph.leafs;
        if ( leafs.length === 0 ) {
            this._currentRenderBin.addStateGraph( this._currentStateGraph );
        }

        var leaf = this._getReservedLeaf();
        var depth = 0;
        if ( bb.valid() ) {
            depth = this.distance( bb.center(), modelview );
        }
        if ( isNaN( depth ) ) {
            Notify.warn( 'warning geometry has a NaN depth, ' + modelview + ' center ' + bb.center() );
        } else {
            //leaf.id = this._reserveLeafStack.current;
            leaf.parent = this._currentStateGraph;
            leaf.projection = this._projectionMatrixStack[ this._projectionMatrixStack.length - 1 ];
            leaf.geometry = node;
            leaf.modelview = modelview;
            leaf.depth = depth;
            leafs.push( leaf );
        }

        if ( stateset ) {
            this.popStateSet();
        }
    };

    return CullVisitor;
} );
/*global define */

define( [], function () {

    var clamp = function ( x, min, max ) {
        // http://jsperf.com/math-clamp
        // http://jsperf.com/clamping-methods/2
        return Math.min( max, Math.max( min, x ) );
    };

    var smoothStep = function ( edge0, edge1, x ) {
        var t = clamp( ( x - edge0 ) / ( edge1 - edge0 ), 0.0, 1.0 );
        return t * t * ( 3.0 - 2.0 * t );
    };

    return {
        clamp: clamp,
        smoothStep: smoothStep
    };
} );
/*global define */

define( [
	'osgAnimation/Animation',
	'osgAnimation/AnimationUpdateCallBack',
	'osgAnimation/BasicAnimationManager',
	'osgAnimation/Channel',
	'osgAnimation/Easing',
	'osgAnimation/FloatLerpChannel',
	'osgAnimation/FloatTarget',
	'osgAnimation/Interpolator',
	'osgAnimation/Keyframe',
	'osgAnimation/LinkVisitor',
	'osgAnimation/QuatLerpChannel',
	'osgAnimation/QuatSLerpChannel',
	'osgAnimation/QuatTarget',
	'osgAnimation/Sampler',
	'osgAnimation/StackedQuaternion',
	'osgAnimation/StackedRotateAxis',
	'osgAnimation/StackedTranslate',
	'osgAnimation/Target',
	'osgAnimation/UpdateMatrixTransform',
	'osgAnimation/Vec3LerpChannel',
	'osgAnimation/Vec3Target'
], function ( Animation, AnimationUpdateCallBack, BasicAnimationManager, Channel, Easing, FloatLerpChannel, FloatTarget, Interpolator, Keyframe, LinkVisitor, QuatLerpChannel, QuatSLerpChannel, QuatTarget, Sampler, StackedQuaternion, StackedRotateAxis, StackedTranslate, Target, UpdateMatrixTransform, Vec3LerpChannel, Vec3Target ) {

	/** -*- compile-command: "jslint-cli osgAnimation.js" -*-
	 *
	 *  Copyright (C) 2010 Cedric Pinson
	 *
	 *                  GNU LESSER GENERAL PUBLIC LICENSE
	 *                      Version 3, 29 June 2007
	 *
	 * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
	 * Everyone is permitted to copy and distribute verbatim copies
	 * of this license document, but changing it is not allowed.
	 *
	 * This version of the GNU Lesser General Public License incorporates
	 * the terms and conditions of version 3 of the GNU General Public
	 * License
	 *
	 * Authors:
	 *  Cedric Pinson <cedric.pinson@plopbyte.com>
	 *
	 */

	var osgAnimation = {};

	osgAnimation.Animation = Animation;
	osgAnimation.AnimationUpdateCallBack = AnimationUpdateCallBack;
	osgAnimation.BasicAnimationManager = BasicAnimationManager;
	osgAnimation.Channel = Channel;
	osgAnimation.Easing = Easing;
	osgAnimation.FloatLerpChannel = FloatLerpChannel;
	osgAnimation.FloatTarget = FloatTarget;
	osgAnimation.Interpolator = Interpolator;
	osgAnimation.Keyframe = Keyframe;
	osgAnimation.LinkVisitor = LinkVisitor;
	osgAnimation.QuatLerpChannel = QuatLerpChannel;
	osgAnimation.QuatSLerpChannel = QuatSLerpChannel;
	osgAnimation.QuatTarget = QuatTarget;
	osgAnimation.Sampler = Sampler;
	osgAnimation.StackedQuaternion = StackedQuaternion;
	osgAnimation.StackedRotateAxis = StackedRotateAxis;
	osgAnimation.StackedTranslate = StackedTranslate;
	osgAnimation.Target = Target;
	osgAnimation.UpdateMatrixTransform = UpdateMatrixTransform;
	osgAnimation.Vec3LerpChannel = Vec3LerpChannel;
	osgAnimation.Vec3Target = Vec3Target;

	osgAnimation.easeOutQuad = Easing.easeOutQuad;
	osgAnimation.easeInQuad = Easing.easeInQuad;
	osgAnimation.easeOutCubic = Easing.easeOutCubic;
	osgAnimation.easeInCubic = Easing.easeInCubic;
	osgAnimation.easeOutQuart = Easing.easeOutQuart;
	osgAnimation.easeInQuart = Easing.easeInQuart;
	osgAnimation.easeOutElastic = Easing.easeOutElastic;
	osgAnimation.easeOutBounce = Easing.easeOutBounce;

	return osgAnimation;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Object'
], function ( MACROUTILS, Object ) {

    /** -*- compile-command: "jslint-cli Animation.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */

    /** 
     *  Animation
     *  @class Animation
     */
    var Animation = function () {
        Object.call( this );
        this._channels = [];
    };

    /** @lends Animation.prototype */
    Animation.prototype = MACROUTILS.objectInehrit( Object.prototype, {
        getChannels: function () {
            return this._channels;
        },
        getDuration: function () {
            var tmin = 1e5;
            var tmax = -1e5;
            for ( var i = 0, l = this._channels.length; i < l; i++ ) {
                var channel = this._channels[ i ];
                tmin = Math.min( tmin, channel.getStartTime() );
                tmax = Math.max( tmax, channel.getEndTime() );
            }
            return tmax - tmin;
        }

    } );

    return Animation;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/Object'
], function ( Notify, Utils, Object ) {

    /** -*- compile-command: "jslint-cli AnimationManager.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */


    /** 
     *  BasicAnimationManager
     *  @class BasicAnimationManager
     */
    var BasicAnimationManager = function () {
        Object.call( this );
        this._animations = {};

        this._actives = {};
        this._actives._keys = [];

        this._lastUpdate = undefined;
        this._targets = [];
    };

    /** @lends BasicAnimationManager.prototype */
    BasicAnimationManager.prototype = MACROUTILS.objectInehrit( Object.prototype, {
        _updateAnimation: function ( animationParameter, t, priority ) {
            var duration = animationParameter.duration;
            var weight = animationParameter.weight;
            var animation = animationParameter.anim;
            var start = animationParameter.start;
            var loop = animationParameter.loop;

            if ( loop > 0 ) {
                var playedTimes = t - start;
                if ( playedTimes >= loop * duration ) {
                    return true;
                }
            }

            t = ( t - start ) % duration;
            var callback = animationParameter.callback;
            if ( callback ) {
                callback( t );
            }

            var channels = animation.getChannels();
            for ( var i = 0, l = channels.length; i < l; i++ ) {
                var channel = channels[ i ];
                channel.update( t, weight, priority );
            }
            return false;
        },
        update: function ( node, nv ) {
            var t = nv.getFrameStamp().getSimulationTime();
            this.updateManager( t );
            return true;
        },
        updateManager: function ( t ) {

            var targets = this._targets;
            for ( var i = 0, l = targets.length; i < l; i++ ) {
                targets[ i ].reset();
            }
            if ( this._actives._keys.length > 0 ) {
                var pri = this._actives._keys.length - 1;
                while ( pri >= 0 ) {
                    var layer = this._actives[ pri ];
                    var keys = this._actives[ pri ]._keys;
                    var removes = [];
                    for ( var ai = 0, al = keys.length; ai < al; ai++ ) {
                        var key = keys[ ai ];
                        var anim = layer[ key ];
                        if ( anim.start === undefined ) {
                            anim.start = t;
                        }
                        var remove = this._updateAnimation( anim, t, pri );
                        if ( remove ) {
                            removes.push( ai );
                        }
                    }

                    // remove finished animation
                    for ( var j = removes.length - 1; j >= 0; j-- ) {
                        var k = keys[ j ];
                        keys.splice( j, 1 );
                        delete layer[ k ];
                    }

                    pri--;
                }
            }
        },

        stopAll: function () {},
        isPlaying: function ( name ) {
            if ( this._actives._keys.length > 0 ) {
                var pri = this._actives._keys.length - 1;
                while ( pri >= 0 ) {
                    if ( this._actives[ pri ][ name ] ) {
                        return true;
                    }
                    pri--;
                }
            }
            return false;
        },
        stopAnimation: function ( name ) {
            if ( this._actives._keys.length > 0 ) {
                var pri = this._actives._keys.length - 1;
                var filterFunction = function ( element, index, array ) {
                    return element !== "_keys";
                };
                while ( pri >= 0 ) {
                    if ( this._actives[ pri ][ name ] ) {
                        delete this._actives[ pri ][ name ];
                        this._actives[ pri ]._keys = Object.keys( this._actives[ pri ] ).filter( filterFunction );
                        return;
                    }
                    pri--;
                }
            }
        },
        playAnimationObject: function ( obj ) {
            if ( obj.name === undefined ) {
                return;
            }

            var anim = this._animations[ obj.name ];
            if ( anim === undefined ) {
                Notify.log( "no animation " + obj.name + " found" );
                return;
            }

            if ( this.isPlaying( obj.name ) ) {
                return;
            }

            if ( obj.priority === undefined ) {
                obj.priority = 0;
            }

            if ( obj.weight === undefined ) {
                obj.weight = 1.0;
            }

            if ( obj.timeFactor === undefined ) {
                obj.timeFactor = 1.0;
            }

            if ( obj.loop === undefined ) {
                obj.loop = 0;
            }

            if ( this._actives[ obj.priority ] === undefined ) {
                this._actives[ obj.priority ] = {};
                this._actives[ obj.priority ]._keys = [];
                this._actives._keys.push( obj.priority ); // = Object.keys(this._actives);
            }

            obj.start = undefined;
            obj.duration = anim.getDuration();
            obj.anim = anim;
            this._actives[ obj.priority ][ obj.name ] = obj;
            this._actives[ obj.priority ]._keys.push( obj.name );
        },

        playAnimation: function ( name, priority, weight ) {
            var animName = name;
            if ( typeof name === "object" ) {
                if ( name.getName === undefined ) {
                    return this.playAnimationObject( name );
                } else {
                    animName = name.getName();
                }
            }
            var obj = {
                'name': animName,
                'priority': priority,
                'weight': weight
            };

            return this.playAnimationObject( obj );
        },

        registerAnimation: function ( anim ) {
            this._animations[ anim.getName() ] = anim;
            this.buildTargetList();
        },
        getAnimationMap: function () {
            return this._animations;
        },
        buildTargetList: function () {
            this._targets.length = 0;
            var keys = Object.keys( this._animations );
            for ( var i = 0, l = keys.length; i < l; i++ ) {
                var a = this._animations[ keys[ i ] ];
                var channels = a.getChannels();
                for ( var c = 0, lc = channels.length; c < lc; c++ ) {
                    var channel = channels[ c ];
                    this._targets.push( channel.getTarget() );
                }
            }
        }

    } );

    return BasicAnimationManager;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Object'
], function ( MACROUTILS, Object ) {

    /** -*- compile-command: "jslint-cli Channel.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */

    /** 
     *  Channel is responsible to interpolate keys
     *  @class Channel
     */
    var Channel = function ( sampler, target ) {
        Object.call( this );
        this._sampler = sampler;
        this._target = target;
        this._targetName = undefined;
        this._data = {
            'value': undefined,
            'key': 0
        };
    };

    /** @lends Channel.prototype */
    Channel.prototype = MACROUTILS.objectInehrit( Object.prototype, {
        getKeyframes: function () {
            return this._sampler.getKeyframes();
        },
        setKeyframes: function ( keys ) {
            this._sampler.setKeyframes( keys );
        },
        getStartTime: function () {
            return this._sampler.getStartTime();
        },
        getEndTime: function () {
            return this._sampler.getEndTime();
        },
        getSampler: function () {
            return this._sampler;
        },
        setSampler: function ( sampler ) {
            this._sampler = sampler;
        },
        getTarget: function () {
            return this._target;
        },
        setTarget: function ( target ) {
            this._target = target;
        },
        setTargetName: function ( name ) {
            this._targetName = name;
        },
        getTargetName: function () {
            return this._targetName;
        },
        update: function ( t, weight, priority ) {
            weight = weight || 1.0;
            priority = priority || 0.0;

            // skip if weight == 0
            if ( weight < 1e-4 )
                return;
            var data = this._data;
            this._sampler.getValueAt( t, data );
            this._target.update.call( this._target, weight, data.value, priority );
        },
        reset: function () {
            this._target.reset();
        }
    } );

    return Channel;
} );
/*global define */

define( [
    'osg/Quat'
], function ( Quat ) {

    /** -*- compile-command: "jslint-cli Interpolator.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */

    /** 
     *  Interpolator provide interpolation function to sampler
     */
    var Vec3LerpInterpolator = function ( keys, t, result ) {
        var keyStart;
        var startTime;
        var keyEnd = keys[ keys.length - 1 ];
        var endTime = keyEnd.t;
        if ( t >= endTime ) {
            result.key = 0;
            result.value[ 0 ] = keyEnd[ 0 ];
            result.value[ 1 ] = keyEnd[ 1 ];
            result.value[ 2 ] = keyEnd[ 2 ];
            return;
        } else {
            keyStart = keys[ 0 ];
            startTime = keyStart.t;

            if ( t <= startTime ) {
                result.key = 0;
                result.value[ 0 ] = keyStart[ 0 ];
                result.value[ 1 ] = keyStart[ 1 ];
                result.value[ 2 ] = keyStart[ 2 ];
                return;
            }
        }

        var i1 = result.key;
        while ( keys[ i1 + 1 ].t < t ) {
            i1++;
        }
        var i2 = i1 + 1;

        var t1 = keys[ i1 ].t;
        var x1 = keys[ i1 ][ 0 ];
        var y1 = keys[ i1 ][ 1 ];
        var z1 = keys[ i1 ][ 2 ];

        var t2 = keys[ i2 ].t;
        var x2 = keys[ i2 ][ 0 ];
        var y2 = keys[ i2 ][ 1 ];
        var z2 = keys[ i2 ][ 2 ];

        var r = ( t - t1 ) / ( t2 - t1 );

        result.value[ 0 ] = x1 + ( x2 - x1 ) * r;
        result.value[ 1 ] = y1 + ( y2 - y1 ) * r;
        result.value[ 2 ] = z1 + ( z2 - z1 ) * r;
        result.key = i1;
    };


    QuatLerpInterpolator = function ( keys, t, result ) {
        var keyStart;
        var startTime;
        var keyEnd = keys[ keys.length - 1 ];
        var endTime = keyEnd.t;
        if ( t >= endTime ) {
            result.key = 0;
            result.value[ 0 ] = keyEnd[ 0 ];
            result.value[ 1 ] = keyEnd[ 1 ];
            result.value[ 2 ] = keyEnd[ 2 ];
            result.value[ 3 ] = keyEnd[ 3 ];
            return;
        } else {
            keyStart = keys[ 0 ];
            startTime = keyStart.t;

            if ( t <= startTime ) {
                result.key = 0;
                result.value[ 0 ] = keyStart[ 0 ];
                result.value[ 1 ] = keyStart[ 1 ];
                result.value[ 2 ] = keyStart[ 2 ];
                result.value[ 3 ] = keyStart[ 3 ];
                return;
            }
        }

        var i1 = result.key;
        while ( keys[ i1 + 1 ].t < t ) {
            i1++;
        }
        var i2 = i1 + 1;

        var t1 = keys[ i1 ].t;
        var x1 = keys[ i1 ][ 0 ];
        var y1 = keys[ i1 ][ 1 ];
        var z1 = keys[ i1 ][ 2 ];
        var w1 = keys[ i1 ][ 3 ];

        var t2 = keys[ i2 ].t;
        var x2 = keys[ i2 ][ 0 ];
        var y2 = keys[ i2 ][ 1 ];
        var z2 = keys[ i2 ][ 2 ];
        var w2 = keys[ i2 ][ 3 ];

        var r = ( t - t1 ) / ( t2 - t1 );

        result.value[ 0 ] = x1 + ( x2 - x1 ) * r;
        result.value[ 1 ] = y1 + ( y2 - y1 ) * r;
        result.value[ 2 ] = z1 + ( z2 - z1 ) * r;
        result.value[ 3 ] = w1 + ( w2 - w1 ) * r;
        result.key = i1;
    };

    QuatSlerpInterpolator = function ( keys, t, result ) {
        var keyStart;
        var startTime;
        var keyEnd = keys[ keys.length - 1 ];
        var endTime = keyEnd.t;
        if ( t >= endTime ) {
            result.key = 0;
            result.value[ 0 ] = keyEnd[ 0 ];
            result.value[ 1 ] = keyEnd[ 1 ];
            result.value[ 2 ] = keyEnd[ 2 ];
            result.value[ 3 ] = keyEnd[ 3 ];
            return;
        } else {
            keyStart = keys[ 0 ];
            startTime = keyStart.t;

            if ( t <= startTime ) {
                result.key = 0;
                result.value[ 0 ] = keyStart[ 0 ];
                result.value[ 1 ] = keyStart[ 1 ];
                result.value[ 2 ] = keyStart[ 2 ];
                result.value[ 3 ] = keyStart[ 3 ];
                return;
            }
        }

        var i1 = result.key;
        while ( keys[ i1 + 1 ].t < t ) {
            i1++;
        }
        var i2 = i1 + 1;

        var t1 = keys[ i1 ].t;
        var t2 = keys[ i2 ].t;
        var r = ( t - t1 ) / ( t2 - t1 );

        Quat.slerp( r, keys[ i1 ], keys[ i2 ], result.value );
        result.key = i1;
    };


    /** 
     *  Interpolator provide interpolation function to sampler
     */
    FloatLerpInterpolator = function ( keys, t, result ) {
        var keyStart;
        var startTime;
        var keyEnd = keys[ keys.length - 1 ];
        var endTime = keyEnd.t;
        if ( t >= endTime ) {
            result.key = 0;
            result.value = keyEnd[ 0 ];
            return;
        } else {
            keyStart = keys[ 0 ];
            startTime = keyStart.t;

            if ( t <= startTime ) {
                result.key = 0;
                result.value = keyStart[ 0 ];
                return;
            }
        }

        var i1 = result.key;
        while ( keys[ i1 + 1 ].t < t ) {
            i1++;
        }
        var i2 = i1 + 1;

        var t1 = keys[ i1 ].t;
        var x1 = keys[ i1 ][ 0 ];

        var t2 = keys[ i2 ].t;
        var x2 = keys[ i2 ][ 0 ];

        var r = ( t - t1 ) / ( t2 - t1 );
        result.value = x1 + ( x2 - x1 ) * r;
        result.key = i1;
    };


    /** 
     *  Interpolator provide interpolation function to sampler
     */
    FloatStepInterpolator = function ( keys, t, result ) {
        var keyStart;
        var startTime;
        var keyEnd = keys[ keys.length - 1 ];
        var endTime = keyEnd.t;
        if ( t >= endTime ) {
            result.key = 0;
            result.value = keyEnd[ 0 ];
            return;
        } else {
            keyStart = keys[ 0 ];
            startTime = keyStart.t;

            if ( t <= startTime ) {
                result.key = 0;
                result.value = keyStart[ 0 ];
                return;
            }
        }

        var i1 = result.key;
        while ( keys[ i1 + 1 ].t < t ) {
            i1++;
        }
        var i2 = i1 + 1;

        var t1 = keys[ i1 ].t;
        var x1 = keys[ i1 ][ 0 ];
        result.value = x1;
        result.key = i1;
    };

    return {
        Vec3LerpInterpolator: Vec3LerpInterpolator,
        QuatLerpInterpolator: QuatLerpInterpolator,
        QuatSlerpInterpolator: QuatSlerpInterpolator,
        FloatLerpInterpolator: FloatLerpInterpolator,
        FloatStepInterpolator: FloatStepInterpolator
    }
} );
/*global define */

define( [], function () {

    /** -*- compile-command: "jslint-cli Keyframe.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */

    var createVec3Keyframe = function ( t, array ) {
        var k = array.slice( 0 );
        k.t = t;
        return k;
    };

    createQuatKeyframe = function ( t, array ) {
        var k = array.slice( 0 );
        k.t = t;
        return k;
    };

    createFloatKeyframe = function ( t, value ) {
        var k = [ value ];
        k.t = t;
        return k;
    };

    return {
        createVec3Keyframe: createVec3Keyframe,
        createQuatKeyframe: createQuatKeyframe,
        createFloatKeyframe: createFloatKeyframe
    };
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/NodeVisitor',
    'osg/Object'
], function ( Notify, MACROUTILS, NodeVisitor, Object ) {

    /** -*- compile-command: "jslint-cli LinkVisitor.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */


    /** 
     *  LinkVisitor search for animationUpdateCallback and link animation data
     *  @class LinkVisitor
     */
    var LinkVisitor = function () {
        NodeVisitor.call( this );
        this._animations = undefined;
        this._nbLinkTarget = 0;
    };

    /** @lends LinkVisitor.prototype */
    LinkVisitor.prototype = MACROUTILS.objectInehrit( NodeVisitor.prototype, {
        setAnimationMap: function ( anims ) {
            this._animations = anims;
            this._animationKeys = Object.keys( anims );
        },

        apply: function ( node ) {
            var cbs = node.getUpdateCallbackList();
            for ( var i = 0, l = cbs.length; i < l; i++ ) {
                var cb = cbs[ i ];
                if ( cb instanceof osgAnimation.AnimationUpdateCallback ) {
                    this.link( cb );
                }
            }
            this.traverse( node );
        },

        link: function ( animCallback ) {
            var result = 0;
            var anims = this._animations;
            var animKeys = this._animationKeys;
            for ( var i = 0, l = animKeys.length; i < l; i++ ) {
                var key = animKeys[ i ];
                var anim = anims[ key ];
                result += animCallback.linkAnimation( anim );
            }
            this._nbLinkedTarget += result;
            Notify.log( "linked " + result + " for \"" + animCallback.getName() + '"' );
        }

    } );

    return LinkVisitor;
} );
/*global define */

define( [], function () {

    /** -*- compile-command: "jslint-cli Sampler.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */


    /** 
     *  Sampler is responsible to interpolate keys
     *  @class Sampler
     */
    var Sampler = function ( keys, interpolator ) {
        if ( !keys ) {
            keys = [];
        }
        this._keys = keys;
        this._interpolator = interpolator;
    };

    /** @lends Sampler.prototype */
    Sampler.prototype = {

        getKeyframes: function () {
            return this._keys;
        },
        setKeyframes: function ( keys ) {
            this._keys = keys;
        },
        setInterpolator: function ( interpolator ) {
            this._interpolator = interpolator;
        },
        getInterpolator: function () {
            return this._interpolator;
        },
        getStartTime: function () {
            if ( this._keys.length === 0 ) {
                return undefined;
            }
            return this._keys[ 0 ].t;
        },
        getEndTime: function () {
            if ( this._keys.length === 0 ) {
                return undefined;
            }
            return this._keys[ this._keys.length - 1 ].t;
        },

        // result contains the keyIndex where to start, this key
        // will be updated when calling the Interpolator
        // result.value will contain the interpolation result
        // { 'value': undefined, 'keyIndex': 0 };
        getValueAt: function ( t, result ) {
            // reset the key if invalid
            if ( this._keys[ result.key ].t > t ) {
                result.key = 0;
            }
            this._interpolator( this._keys, t, result );
        }
    };

    return Sampler;
} );
/*global define */

define( [], function ( osg ) {

    /** -*- compile-command: "jslint-cli Target.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */

    /** 
     *  Target keep internal data of element to animate, and some function to merge them
     *  @class Target
     */
    var Target = function () {
        this._weight = 0;
        this._priorityWeight = 0;
        this._count = 0;
        this._lastPriority = 0;
        this._target = undefined;
    };

    Target.prototype = {
        reset: function () {
            this._weight = 0;
            this._priorityWeight = 0;
        },
        getValue: function () {
            return this._target;
        }
    };

    return Target;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osgAnimation/AnimationUpdateCallback',
    'osg/matrix'
], function ( Notify, MACROUTILS, AnimationUpdateCallback, matrix ) {

    /** -*- compile-command: 'jslint-cli UpdateMatrixTransform.js' -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */

    /** 
     *  UpdateMatrixTransform
     *  @class UpdateMatrixTransform
     */
    var UpdateMatrixTransform = function () {
        AnimationUpdateCallback.call( this );
        this._stackedTransforms = [];
    };

    /** @lends AnimationUpdateCallback.prototype */
    UpdateMatrixTransform.prototype = MACROUTILS.objectInehrit( AnimationUpdateCallback.prototype, {
        getStackedTransforms: function () {
            return this._stackedTransforms;
        },
        update: function ( node, nv ) {

            // not optimized, we could avoid operation the animation did not change
            // the content of the transform element
            var matrix = node.getMatrix();
            Matrix.makeIdentity( matrix );
            var transforms = this._stackedTransforms;
            for ( var i = 0, l = transforms.length; i < l; i++ ) {
                var transform = transforms[ i ];
                transform.update();
                transform.applyToMatrix( matrix );
            }
            return true;
        },
        linkChannel: function ( channel ) {
            var channelName = channel.getName();
            var transforms = this._stackedTransforms;
            for ( var i = 0, l = transforms.length; i < l; i++ ) {
                var transform = transforms[ i ];
                var elementName = transform.getName();
                if ( channelName.length > 0 && elementName === channelName ) {
                    var target = transform.getOrCreateTarget();
                    if ( target ) {
                        channel.setTarget( target );
                        return true;
                    }
                }
            }
            Notify.log( 'can\'t link channel ' + channelName + ', does not contain a symbolic name that can be linked to TransformElements' );
        }

    } );

    return osgAnimation;
} );
/*global define */

define( [
    'osgUtil/Composer',
    'osgUtil/IntersectVisitor',
    'osgUtil/ShaderParameterVisitor',
    'osgUtil/TriangleIntersect'
], function (Composer, IntersectVisitor, ShaderParameterVisitor, TriangleIntersect) {

    /** -*- compile-command: "jslint-cli osgUtil.js" -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    var osgUtil = {};

    osgUtil.Composer = Composer;
    osgUtil.IntersectVisitor = IntersectVisitor;
    osgUtil.ShaderParameterVisitor = ShaderParameterVisitor;
    osgUtil.TriangleIntersect = TriangleIntersect;

    return osgUtil;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Vec3'
], function ( Notify, vec3 ) {

    /** -*- compile-command: "jslint-cli TriangleIntersect.js" -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    var TriangleHit = function ( index, normal, r1, v1, r2, v2, r3, v3 ) {
        this.index = index;
        this.normal = normal;
        this.r1 = r1;
        this.v1 = v1;
        this.r2 = r2;
        this.v2 = v2;
        this.r3 = r3;
        this.v3 = v3;
    };

    TriangleIntersect = function () {
        this.hits = [];
        this.nodePath = [];
    };

    TriangleIntersect.prototype = {
        setNodePath: function ( np ) {
            this.nodePath = np;
        },
        set: function ( start, end ) {
            this.start = start;
            this.end = end;
            this.dir = Vec3.sub( end, start, [] );
            this.length = Vec3.length( this.dir );
            var l = 1.0 / this.length;
            Vec3.mult( this.dir, l, this.dir );
        },

        applyDrawElementsTriangles: function ( count, vertexes, indexes ) {
            var v0 = [];
            var v1 = [];
            var v2 = [];

            var idx0, idx1, idx2;
            for ( var idx = 0; idx < count; idx += 3 ) {
                idx0 = indexes[ idx ] * 3;
                v0[ 0 ] = vertexes[ idx0 ];
                v0[ 1 ] = vertexes[ idx0 + 1 ];
                v0[ 2 ] = vertexes[ idx0 + 2 ];

                idx1 = indexes[ idx + 1 ] * 3;
                v1[ 0 ] = vertexes[ idx1 ];
                v1[ 1 ] = vertexes[ idx1 + 1 ];
                v1[ 2 ] = vertexes[ idx1 + 2 ];

                idx2 = indexes[ idx + 2 ] * 3;
                v2[ 0 ] = vertexes[ idx2 ];
                v2[ 1 ] = vertexes[ idx2 + 1 ];
                v2[ 2 ] = vertexes[ idx2 + 2 ];
                this.intersect( v0, v1, v2 );
            }
        },

        applyDrawElementsTriangleStrip: function ( count, vertexes, indexes ) {
            var v0 = [];
            var v1 = [];
            var v2 = [];

            var idx0, idx1, idx2;
            for ( var i = 2, idx = 0; i < count; i++, idx++ ) {
                if ( i % 2 ) {
                    idx0 = indexes[ idx ] * 3;
                    idx1 = indexes[ idx + 2 ] * 3;
                    idx2 = indexes[ idx + 1 ] * 3;
                } else {
                    idx0 = indexes[ idx ] * 3;
                    idx1 = indexes[ idx + 1 ] * 3;
                    idx2 = indexes[ idx + 2 ] * 3;
                }
                v0[ 0 ] = vertexes[ idx0 ];
                v0[ 1 ] = vertexes[ idx0 + 1 ];
                v0[ 2 ] = vertexes[ idx0 + 2 ];

                v1[ 0 ] = vertexes[ idx1 ];
                v1[ 1 ] = vertexes[ idx1 + 1 ];
                v1[ 2 ] = vertexes[ idx1 + 2 ];

                v2[ 0 ] = vertexes[ idx2 ];
                v2[ 1 ] = vertexes[ idx2 + 1 ];
                v2[ 2 ] = vertexes[ idx2 + 2 ];
                this.intersect( v0, v1, v2 );
            }
        },

        applyDrawElementsTriangleFan: function ( count, vertexes, indexes ) {
            var v0 = [];
            var v1 = [];
            var v2 = [];

            var idx0 = indexes[ 0 ] * 3;
            v0[ 0 ] = vertexes[ idx0 ];
            v0[ 1 ] = vertexes[ idx0 + 1 ];
            v0[ 2 ] = vertexes[ idx0 + 2 ];

            var idx1, idx2;
            for ( var i = 2, idx = 1; i < count; i++, idx++ ) {
                idx1 = indexes[ idx ] * 3;
                idx2 = indexes[ idx + 1 ] * 3;

                v1[ 0 ] = vertexes[ idx1 ];
                v1[ 1 ] = vertexes[ idx1 + 1 ];
                v1[ 2 ] = vertexes[ idx1 + 2 ];

                v2[ 0 ] = vertexes[ idx2 ];
                v2[ 1 ] = vertexes[ idx2 + 1 ];
                v2[ 2 ] = vertexes[ idx2 + 2 ];
                this.intersect( v0, v1, v2 );
            }
        },

        applyDrawArraysTriangles: function ( first, count, vertexes ) {
            var v0 = [];
            var v1 = [];
            var v2 = [];

            for ( var idx = first; idx < count; idx += 9 ) {
                v0[ 0 ] = vertexes[ idx ];
                v0[ 1 ] = vertexes[ idx + 1 ];
                v0[ 2 ] = vertexes[ idx + 2 ];

                v1[ 0 ] = vertexes[ idx + 3 ];
                v1[ 1 ] = vertexes[ idx + 4 ];
                v1[ 2 ] = vertexes[ idx + 5 ];

                v2[ 0 ] = vertexes[ idx + 6 ];
                v2[ 1 ] = vertexes[ idx + 7 ];
                v2[ 2 ] = vertexes[ idx + 8 ];
                this.intersect( v0, v1, v2 );
            }
        },

        applyDrawArraysTriangleStrip: function ( first, count, vertexes ) {
            var v0 = [];
            var v1 = [];
            var v2 = [];

            var idx0, idx1, idx2;
            for ( var i = 2, idx = first; i < count; i++, idx++ ) {
                if ( i % 2 ) {
                    idx0 = idx * 3;
                    idx1 = ( idx + 2 ) * 3;
                    idx2 = ( idx + 1 ) * 3;
                } else {
                    idx0 = idx * 3;
                    idx1 = ( idx + 1 ) * 3;
                    idx2 = ( idx + 2 ) * 3;
                }
                v0[ 0 ] = vertexes[ idx0 ];
                v0[ 1 ] = vertexes[ idx0 + 1 ];
                v0[ 2 ] = vertexes[ idx0 + 2 ];

                v1[ 0 ] = vertexes[ idx1 ];
                v1[ 1 ] = vertexes[ idx1 + 1 ];
                v1[ 2 ] = vertexes[ idx1 + 2 ];

                v2[ 0 ] = vertexes[ idx2 ];
                v2[ 1 ] = vertexes[ idx2 + 1 ];
                v2[ 2 ] = vertexes[ idx2 + 2 ];
                this.intersect( v0, v1, v2 );
            }
        },

        applyDrawArraysTriangleFan: function ( first, count, vertexes ) {
            var v0 = [];
            var v1 = [];
            var v2 = [];

            var idx0 = first * 3;
            v0[ 0 ] = vertexes[ idx0 ];
            v0[ 1 ] = vertexes[ idx0 + 1 ];
            v0[ 2 ] = vertexes[ idx0 + 2 ];

            var idx1, idx2;
            for ( var i = 2, idx = first + 1; i < count; i++, idx++ ) {
                idx1 = idx * 3;
                idx2 = ( idx + 1 ) * 3;

                v1[ 0 ] = vertexes[ idx1 ];
                v1[ 1 ] = vertexes[ idx1 + 1 ];
                v1[ 2 ] = vertexes[ idx1 + 2 ];

                v2[ 0 ] = vertexes[ idx2 ];
                v2[ 1 ] = vertexes[ idx2 + 1 ];
                v2[ 2 ] = vertexes[ idx2 + 2 ];
                this.intersect( v0, v1, v2 );
            }
        },

        apply: function ( node ) {
            if ( !node.getAttributes().Vertex ) {
                return;
            }
            var primitive;
            var lastIndex;
            var vertexes = node.getAttributes().Vertex.getElements();
            this.index = 0;
            for ( var i = 0, l = node.primitives.length; i < l; i++ ) {
                primitive = node.primitives[ i ];
                if ( primitive.getIndices !== undefined ) {
                    var indexes = primitive.indices.getElements();
                    switch ( primitive.getMode() ) {
                    case gl.TRIANGLES:
                        this.applyDrawElementsTriangles( primitive.getCount(), vertexes, indexes );
                        break;
                    case gl.TRIANGLE_STRIP:
                        this.applyDrawElementsTriangleStrip( primitive.getCount(), vertexes, indexes );
                        break;
                    case gl.TRIANGLE_FAN:
                        this.applyDrawElementsTriangleFan( primitive.getCount(), vertexes, indexes );
                        break;
                    }
                } else { // draw array
                    switch ( primitive.getMode() ) {
                    case gl.TRIANGLES:
                        this.applyDrawArraysTriangles( primitive.getFirst(), primitive.getCount(), vertexes );
                        break;
                    case gl.TRIANGLE_STRIP:
                        this.applyDrawArraysTriangleStrip( primitive.getFirst(), primitive.getCount(), vertexes );
                        break;
                    case gl.TRIANGLE_FAN:
                        this.applyDrawArraysTriangleFan( primitive.getFirst(), primitive.getCount(), vertexes );
                        break;
                    }
                }
            }

        },

        intersect: function ( v1, v2, v3 ) {
            this.index++;

            if ( v1 == v2 || v2 == v3 || v1 == v3 ) {
                return;
            }

            var v12 = Vec3.sub( v2, v1, [] );
            var n12 = Vec3.cross( v12, this.dir, [] );
            var ds12 = Vec3.dot( Vec3.sub( this.start, v1, [] ), n12 );
            var d312 = Vec3.dot( Vec3.sub( v3, v1, [] ), n12 );
            if ( d312 >= 0.0 ) {
                if ( ds12 < 0.0 ) {
                    return;
                }
                if ( ds12 > d312 ) {
                    return;
                }
            } else // d312 < 0
            {
                if ( ds12 > 0.0 ) {
                    return;
                }
                if ( ds12 < d312 ) {
                    return;
                }
            }

            var v23 = Vec3.sub( v3, v2, [] );
            var n23 = Vec3.cross( v23, this.dir, [] );
            var ds23 = Vec3.dot( Vec3.sub( this.start, v2, [] ), n23 );
            var d123 = Vec3.dot( Vec3.sub( v1, v2, [] ), n23 );
            if ( d123 >= 0.0 ) {
                if ( ds23 < 0.0 ) {
                    return;
                }
                if ( ds23 > d123 ) {
                    return;
                }
            } else // d123 < 0
            {
                if ( ds23 > 0.0 ) {
                    return;
                }
                if ( ds23 < d123 ) {
                    return;
                }
            }

            var v31 = Vec3.sub( v1, v3, [] );
            var n31 = Vec3.cross( v31, this.dir, [] );
            var ds31 = Vec3.dot( Vec3.sub( this.start, v3, [] ), n31 );
            var d231 = Vec3.dot( Vec3.sub( v2, v3, [] ), n31 );
            if ( d231 >= 0.0 ) {
                if ( ds31 < 0.0 ) {
                    return;
                }
                if ( ds31 > d231 ) {
                    return;
                }
            } else // d231 < 0
            {
                if ( ds31 > 0.0 ) {
                    return;
                }
                if ( ds31 < d231 ) {
                    return;
                }
            }


            var r3;
            if ( ds12 === 0.0 ) {
                r3 = 0.0;
            } else if ( d312 !== 0.0 ) {
                r3 = ds12 / d312;
            } else {
                return;
            } // the triangle and the line must be parallel intersection.

            var r1;
            if ( ds23 === 0.0 ) {
                r1 = 0.0;
            } else if ( d123 !== 0.0 ) {
                r1 = ds23 / d123;
            } else {
                return;
            } // the triangle and the line must be parallel intersection.

            var r2;
            if ( ds31 === 0.0 ) {
                r2 = 0.0;
            } else if ( d231 !== 0.0 ) {
                r2 = ds31 / d231;
            } else {
                return;
            } // the triangle and the line must be parallel intersection.

            var total_r = ( r1 + r2 + r3 );
            if ( total_r !== 1.0 ) {
                if ( total_r === 0.0 ) {
                    return;
                } // the triangle and the line must be parallel intersection.
                var inv_total_r = 1.0 / total_r;
                r1 *= inv_total_r;
                r2 *= inv_total_r;
                r3 *= inv_total_r;
            }

            var inside = [];
            Vec3.add( Vec3.mult( v1, r1, [] ),
                Vec3.mult( v2, r2, [] ),
                inside );
            Vec3.add( Vec3.mult( v3, r3, [] ),
                inside,
                inside );
            if ( !Vec3.valid( inside ) ) {
                Notify.log( "Warning: TriangleIntersect " );
                Notify.log( "hit:     " + inside );
                Notify.log( "         " + v1 );
                Notify.log( "         " + v2 );
                Notify.log( "         " + v3 );
                return;
            }

            var d = Vec3.dot( Vec3.sub( inside,
                this.start, [] ), this.dir );

            if ( d < 0.0 ) {
                return;
            }
            if ( d > this.length ) {
                return;
            }

            var normal = Vec3.cross( v12, v23, [] );
            Vec3.normalize( normal, normal );

            var r = d / this.length;

            var pnt = [];
            pnt[ 0 ] = this.start[ 0 ] * ( 1.0 - r ) + this.end[ 0 ] * r;
            pnt[ 1 ] = this.start[ 1 ] * ( 1.0 - r ) + this.end[ 1 ] * r;
            pnt[ 2 ] = this.start[ 2 ] * ( 1.0 - r ) + this.end[ 2 ] * r;

            this.hits.push( {
                'ratio': r,
                'nodepath': this.nodePath.slice( 0 ),
                'triangleHit': new TriangleHit( this.index - 1, normal, r1, v1, r2, v2, r3, v3 ),
                'point': pnt

            } );
            this.hit = true;
        }
    };

    return TriangleIntersect;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/NodeVisitor',
    'osg/Matrix',
    'osg/Vec3',
    'osgUtil/TriangleIntersect'
], function ( MACROUTILS, NodeVisitor, Matrix, Vec3, TriangleIntersect ) {

    /** -*- compile-command: "jslint-cli IntersectVisitor.js" -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    var IntersectVisitor = function () {
        NodeVisitor.call( this );
        this.matrix = [];
        this.hits = [];
        this.nodePath = [];
    };
    IntersectVisitor.prototype = MACROUTILS.objectInehrit( NodeVisitor.prototype, {
        addLineSegment: function ( start, end ) {
            this.start = start;
            this.end = end;
        },
        intersectSegmentWithSphere: function ( start, end, bsphere ) {
            var sm = Vec3.sub( start, bsphere.center );
            var c = Vec3.length2( sm ) - bsphere.radius * bsphere.radius;
            if ( c < 0.0 ) {
                return true;
            }

            var se = Vec3.sub( end, start );
            var a = Vec3.length2( se );
            var b = Vec3.dot( sm, se ) * 2.0;
            var d = b * b - 4.0 * a * c;
            if ( d < 0.0 ) {
                return false;
            }

            d = Math.sqrt( d );
            var div = 1.0 / 2.0 * a;
            var r1 = ( -b - d ) * div;
            var r2 = ( -b + d ) * div;

            if ( r1 <= 0.0 && r2 <= 0.0 ) {
                return false;
            }

            if ( r1 >= 1.0 && r2 >= 1.0 ) {
                return false;
            }
            return true;
        },
        pushModelMatrix: function ( matrix ) {
            if ( this.matrix.length > 0 ) {
                var m = Matrix.copy( this.matrix[ this.matrix.length - 1 ] );
                Matrix.preMult( m, matrix );
                this.matrix.push( m );
            } else {
                this.matrix.push( matrix );
            }
        },
        getModelMatrix: function () {
            if ( this.matrix.length === 0 ) {
                return Matrix.makeIdentity( [] );
            }
            return this.matrix[ this.matrix.length - 1 ];
        },
        popModelMatrix: function () {
            return this.matrix.pop();
        },
        getWindowMatrix: function () {
            return this.windowMatrix;
        },
        getProjectionMatrix: function () {
            return this.projectionMatrix;
        },
        getViewMatrix: function () {
            return this.viewMatrix;
        },
        intersectSegmentWithGeometry: function ( start, end, geometry ) {
            ti = new TriangleIntersect();
            ti.setNodePath( this.nodePath );
            ti.set( start, end );
            ti.apply( geometry );
            var l = ti.hits.length;
            if ( l > 0 ) {
                for ( var i = 0; i < l; i++ ) {
                    this.hits.push( ti.hits[ i ] );
                }
                return true;
            }
            return false;
        },
        pushCamera: function ( camera ) {
            // we should support hierarchy of camera
            // but right now we want just simple picking on main
            // camera
            this.projectionMatrix = camera.getProjectionMatrix();
            this.viewMatrix = camera.getViewMatrix();

            var vp = camera.getViewport();
            if ( vp !== undefined ) {
                this.windowMatrix = vp.computeWindowMatrix();
            }
        },
        applyCamera: function ( camera ) {
            // we should support hierarchy of camera
            // but right now we want just simple picking on main
            // camera
            this.pushCamera( camera );
            this.traverse( camera );
        },

        applyNode: function ( node ) {
            if ( node.getMatrix ) {
                this.pushModelMatrix( node.getMatrix() );
            }

            if ( node.primitives ) {
                var matrix = [];
                Matrix.copy( this.getWindowMatrix(), matrix );
                Matrix.preMult( matrix, this.getProjectionMatrix() );
                Matrix.preMult( matrix, this.getViewMatrix() );
                Matrix.preMult( matrix, this.getModelMatrix() );

                var inv = [];
                var valid = Matrix.inverse( matrix, inv );
                // if matrix is invalid do nothing on this node
                if ( !valid ) {
                    return;
                }

                var ns = Matrix.transformVec3( inv, this.start, new Array( 3 ) );
                var ne = Matrix.transformVec3( inv, this.end, new Array( 3 ) );
                this.intersectSegmentWithGeometry( ns, ne, node );
            }

            if ( node.traverse ) {
                this.traverse( node );
            }

            if ( node.getMatrix ) {
                this.popModelMatrix();
            }
        },

        apply: function ( node ) {
            if ( this.enterNode( node ) === false ) {
                return;
            }

            if ( node.getViewMatrix ) { // Camera/View
                this.applyCamera( node );
            } else {
                this.applyNode( node );
            }
        },

        enterNode: function ( node ) {
            var bsphere = node.boundingSphere;
            if ( bsphere !== undefined ) {
                if ( !this.intersectSegmentWithSphere ) {
                    return false;
                }
            }
            return true;
        }
    } );

    return IntersectVisitor;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/Uniform',
    'osg/NodeVisitor'
], function ( Notify, MACROUTILS, Uniform, NodeVisitor ) {

    /** -*- compile-command: 'jslint-cli ShaderParameterVisitor.js' -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    var ArraySlider = function ( params ) {
        if ( params !== undefined ) {
            if ( params.object !== undefined && params.field !== undefined ) {
                this.createInternalSlider( param );
            }
            this._uniform = this.createInternalSliderUniform( param );
        }
    };

    ArraySlider.prototype = {
        setTargetHTML: function ( target ) {
            this.parent = target;
        },
        addToDom: function ( content ) {
            var mydiv = document.createElement( 'div' );
            mydiv.innerHTML = content;
            this.parent.appendChild( mydiv );
        },

        getValue: function ( name ) {
            if ( window.localStorage ) {
                var value = window.localStorage.getItem( name );
                return value;
            }
            return null;
        },
        setValue: function ( name, value ) {
            if ( window.localStorage ) {
                window.localStorage.setItem( name, value );
            }
        },
        createHTMLSlider: function ( param, value, nameIndex, cbnameIndex ) {
            var input = '<div>NAME [ MIN - MAX ] <input type="range" min="MIN" max="MAX" value="VALUE" step="STEP" onchange="ONCHANGE" /><span id="UPDATE"></span></div>';
            var min = param.min;
            var max = param.max;
            var step = param.step;
            var name = nameIndex;
            var cbname = cbnameIndex;
            var onchange = cbname + '(this.value)';
            input = input.replace( /MIN/g, min );
            input = input.replace( /MAX/g, ( max + step ) );
            input = input.replace( 'STEP', step );
            input = input.replace( 'VALUE', value );
            input = input.replace( /NAME/g, name );
            input = input.replace( /UPDATE/g, cbname );
            input = input.replace( 'ONCHANGE', onchange );
            return input;
        },

        createUniformFunction: function ( param, name, index, uniform, cbnameIndex ) {
            self = this;
            return ( function () {
                var cname = name;
                var cindex = index;
                var cuniform = uniform;
                var id = cbnameIndex;
                var func = function ( value ) {
                    cuniform.get()[ cindex ] = value;
                    cuniform.dirty();
                    Notify.debug( cname + ' value ' + value );
                    document.getElementById( cbnameIndex ).innerHTML = Number( value ).toFixed( 4 );
                    self.setValue( id, value );
                    if ( param.onchange !== undefined ) {
                        param.onchange( cuniform.get() );
                    }
                    // store the value to localstorage
                };
                return func;
            } )();
        },

        createFunction: function ( param, name, index, object, field, cbnameIndex ) {
            self = this;
            return ( function () {
                var cname = name;
                var cindex = index;
                var cfield = field;
                var id = cbnameIndex;
                var obj = object;
                var func = function ( value ) {
                    if ( typeof ( value ) === 'string' ) {
                        value = parseFloat( value );
                    }

                    if ( typeof ( object[ cfield ] ) === 'number' ) {
                        obj[ cfield ] = value;
                    } else {
                        obj[ cfield ][ index ] = value;
                    }
                    Notify.debug( cname + ' value ' + value );
                    document.getElementById( cbnameIndex ).innerHTML = Number( value ).toFixed( 4 );
                    self.setValue( id, value );
                    if ( param.onchange !== undefined ) {
                        param.onchange( obj[ cfield ] );
                    }

                    // store the value to localstorage
                };
                return func;
            } )();
        },

        getCallbackName: function ( name, prgId ) {
            return 'change_' + prgId + '_' + name;
        },

        copyDefaultValue: function ( param ) {
            var uvalue = param.value;
            if ( Array.isArray( param.value ) ) {
                uvalue = param.value.slice();
            } else {
                uvalue = [ uvalue ];
            }
            return uvalue;
        },

        createInternalSliderUniform: function ( param ) {
            var uvalue = param.value;
            var uniform = param.uniform;
            if ( uniform === undefined ) {
                var type = param.type;
                type = type.charAt( 0 ).toUpperCase() + type.slice( 1 );
                uniform = Uniform[ 'create' + type ]( uvalue, param.name );
            }

            var cbname = this.getCallbackName( param.name, param.id );
            var dim = uvalue.length;
            for ( var i = 0; i < dim; i++ ) {

                var istring = i.toString();
                var nameIndex = param.name + istring;
                var cbnameIndex = cbname + istring;

                // default value
                var value = uvalue[ i ];

                // read local storage value if it exist
                var readValue = this.getValue( cbnameIndex );
                if ( readValue !== null ) {
                    value = readValue;
                } else if ( param.uniform && param.uniform.get()[ i ] !== undefined ) {
                    // read value from original uniform
                    value = param.uniform.get()[ i ];
                }

                var dom = this.createHTMLSlider( param, value, nameIndex, cbnameIndex );
                this.addToDom( dom );
                window[ cbnameIndex ] = this.createUniformFunction( param, nameIndex, i, uniform, cbnameIndex );
                Notify.log( nameIndex + ' ' + value );
                window[ cbnameIndex ]( value );
            }
            this.uniform = uniform;
            return uniform;
        },

        createInternalSlider: function ( param ) {
            var uvalue = param.value;
            var name = param.name;
            var id = param.id;
            var dim = uvalue.length;
            var cbname = this.getCallbackName( name, id );
            var object = param.object;
            var field = param.field;
            for ( var i = 0; i < dim; i++ ) {

                var istring = i.toString();
                var nameIndex = name + istring;
                var cbnameIndex = cbname + istring;

                // default value
                var value = uvalue[ i ];

                // read local storage value if it exist
                var readValue = this.getValue( cbnameIndex );
                if ( readValue !== null ) {
                    value = readValue;
                } else {
                    if ( typeof object[ field ] === 'number' ) {
                        value = object[ field ];
                    } else {
                        value = object[ field ][ i ];
                    }
                }

                var dom = this.createHTMLSlider( param, value, nameIndex, cbnameIndex );
                this.addToDom( dom );
                window[ cbnameIndex ] = this.createFunction( param, nameIndex, i, object, field, cbnameIndex );
                Notify.log( nameIndex + ' ' + value );
                window[ cbnameIndex ]( value );
            }
        },

        createSlider: function ( param ) {
            if ( param.html !== undefined ) {
                this.setTargetHTML( param.html );
            }
            if ( param.id === undefined ) {
                param.id = param.name;
            }
            param.value = this.copyDefaultValue( param );
            if ( param.type !== undefined ) {
                return this.createInternalSliderUniform( param );
            } else {
                if ( param.object === undefined ) {
                    param.object = {
                        'data': param.value
                    };
                    param.field = 'data';
                }
                return this.createInternalSlider( param );
            }
        }
    };


    var ParameterVisitor = function () {
        NodeVisitor.call( this );

        this.arraySlider = new ArraySlider();
        this.setTargetHTML( document.body );
    };

    ParameterVisitor.createSlider = function ( param ) {
        ( new ArraySlider() ).createSlider( param );
    };

    ParameterVisitor.prototype = MACROUTILS.objectInehrit( NodeVisitor.prototype, {

        setTargetHTML: function ( html ) {
            this.targetHTML = html;
            this.arraySlider.setTargetHTML( this.targetHTML );
        },

        getUniformList: function ( str, map ) {

            //var txt='uniform float Power; // { min: 0.1, max: 2.0, step: 0.1, value: [0,0,0]  }';

            var re1 = '(uniform)'; // Word 1
            var re2 = '.*?'; // Non-greedy match on filler
            var re3 = '((?:[a-z][a-z]+))'; // Word 2
            var re4 = '.*?'; // Non-greedy match on filler
            var re5 = '((?:[a-z][a-z]+))'; // Word 3
            var re6 = '.*?'; // Non-greedy match on filler
            var re7 = '.'; // Uninteresting: c
            var re8 = '.*?'; // Non-greedy match on filler
            var re9 = '.'; // Uninteresting: c
            var re10 = '.*?'; // Non-greedy match on filler
            var re11 = '(.)'; // Any Single Character 1
            var re12 = '(.)'; // Any Single Character 2
            var re13 = '.*?'; // Non-greedy match on filler
            var re14 = '(\\{.*?\\})'; // Curly Braces 1

            var p = new RegExp( re1 + re2 + re3 + re4 + re5 + re6 + re7 + re8 + re9 + re10 + re11 + re12 + re13 + re14, [ 'g' ] );
            var r = str.match( p );
            var list = map;
            if ( r !== null ) {
                var re = new RegExp( re1 + re2 + re3 + re4 + re5 + re6 + re7 + re8 + re9 + re10 + re11 + re12 + re13 + re14, [ 'i' ] );
                for ( var i = 0, l = r.length; i < l; i++ ) {
                    var result = r[ i ].match( re );
                    //var result = p.exec(str);
                    if ( result !== null ) {
                        var word1 = result[ 1 ];
                        var type = result[ 2 ];
                        var name = result[ 3 ];
                        var c1 = result[ 4 ];
                        var c2 = result[ 5 ];
                        var json = result[ 6 ];

                        var param = JSON.parse( json );
                        param.type = type;
                        param.name = name;
                        var value = param.value;
                        param.value = function () {
                            return value;
                        };
                        list[ name ] = param;
                    }
                }
            }
            return list;
        },

        getUniformFromStateSet: function ( stateSet, uniformMap ) {
            var maps = stateSet.getUniformList();
            if ( !maps ) {
                return;
            }
            var keys = Object.keys( uniformMap );
            for ( var i = 0, l = keys.length; i < l; i++ ) {
                var k = keys[ i ];
                // get the first one found in the tree
                if ( maps[ k ] !== undefined && uniformMap[ k ].uniform === undefined ) {
                    uniformMap[ k ].uniform = maps[ k ].object;
                }
            }
        },

        findExistingUniform: function ( node, uniformMap ) {
            var BackVisitor = function () {
                NodeVisitor.call( this, NodeVisitor.TRAVERSE_PARENTS );
            };
            BackVisitor.prototype = MACROUTILS.objectInehrit( NodeVisitor.prototype, {
                setUniformMap: function ( map ) {
                    this.uniformMap = map;
                },
                apply: function ( node ) {
                    var stateSet = node.getStateSet();
                    if ( stateSet ) {
                        ParameterVisitor.prototype.getUniformFromStateSet( stateSet, this.uniformMap );
                    }
                    this.traverse( node );
                }
            } );
            var visitor = new BackVisitor();
            visitor.setUniformMap( uniformMap );
            node.accept( visitor );
        },

        applyProgram: function ( node, stateset ) {
            var program = stateset.getAttribute( 'Program' );
            var programName = program.getName();
            var string = program.getVertexShader().getText();
            var uniformMap = {};
            this.getUniformList( program.getVertexShader().getText(), uniformMap );
            this.getUniformList( program.getFragmentShader().getText(), uniformMap );


            var keys = Object.keys( uniformMap );

            if ( programName === undefined ) {
                var hashCode = function ( str ) {
                    var hash = 0;
                    var chara = 0;
                    if ( str.length === 0 ) {
                        return hash;
                    }
                    for ( i = 0; i < str.length; i++ ) {
                        chara = str.charCodeAt( i );
                        hash = ( ( hash << 5 ) - hash ) + chara;
                        hash = hash & hash; // Convert to 32bit integer
                    }
                    if ( hash < 0 ) {
                        hash = -hash;
                    }
                    return hash;
                };
                var str = keys.join( '' );
                programName = hashCode( str ).toString();
            }

            this.findExistingUniform( node, uniformMap );

            var addedSlider = false;
            for ( var i = 0; i < keys.length; i++ ) {
                var k = keys[ i ];
                var entry = uniformMap[ k ];
                var type = entry.type;
                var name = entry.name;
                entry.id = programName;
                var uniform = this.arraySlider.createSlider( entry );
                if ( false ) {
                    uniform = this.arraySlider.createSlider( {
                        name: name,
                        type: type,
                        id: programName,
                        uniform: entry.uniform
                    } );
                }
                if ( entry.uniform === undefined && uniform ) {
                    stateset.addUniform( uniform );
                }
                addedSlider = true;
            }

            // add a separator
            if ( addedSlider ) {
                var mydiv = document.createElement( 'div' );
                mydiv.innerHTML = '<p> </p>';
                this.targetHTML.appendChild( mydiv );
            }

            Notify.log( uniformMap );
        },


        applyStateSet: function ( node, stateset ) {
            if ( stateset.getAttribute( 'Program' ) !== undefined ) {
                this.applyProgram( node, stateset );
            }
        },

        apply: function ( node ) {
            var element = this.targetHTML;
            if ( element === undefined || element === null ) {
                return;
            }

            var st = node.getStateSet();
            if ( st !== undefined ) {
                this.applyStateSet( node, st );
            }

            this.traverse( node );
        }
    } );

    return ParameterVisitor;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/Node',
    'osg/Depth',
    'osg/Texture',
    'osg/Camera',
    'osg/FrameBufferObject',
    'osg/Viewport',
    'osg/Matrix',
    'osg/Transform',
    'osg/Uniform',
    'osg/StateSet',
    'osg/Program',
    'osg/Shader',
    'osg/Texture',
    'osg/Shape'
], function ( Notify, MACROUTILS, Node, Depth, Texture, Camera, FrameBufferObject, Viewport, Matrix, Transform, Uniform, StateSet, Program, Shader, Texture, Shape ) {

    /*
  Composer is an helper to create post fx. The idea is to push one or more textures into a pipe of shader filter.
  
  how to use it:

  // example how to blur a texture and render it to screen
  var myTexture; // imagine it's your texture you want to process
  var composer = new Composer();
  composer.addPass(new Composer.Filter.InputTexture(myTexture));
  composer.addPass(new Composer.Filter.HBlur(5));
  composer.addPass(new Composer.Filter.VBlur(5));
  composer.renderToScreen(1200, 900);
  composer.build(); // if you dont build manually it will be done in the scenegraph while upading
  rootnode.addChild(composer);

  // now you can imagine to some process and use the result as input texture for a geometry
  var myTexture; // imagine it's your texture you want to process
  var myResultTexture = new Texture(); // imagine it's your texture you want to process
  myResultTexture.setTextureSize(1200,900);
  var composer = new Composer();
  composer.addPass(new Composer.Filter.InputTexture(myTexture));
  composer.addPass(new Composer.Filter.HBlur(5));
  composer.addPass(new Composer.Filter.VBlur(5), resultTexture);

  myGeometry.getStateSet().setTextureAttributeAndModes(0, resultTexture);
  rootnode.addChild(composer);
   
 */

    var Composer = function () {
        Node.call( this );
        this._stack = [];
        this._renderToScreen = false;
        this._dirty = false;
        var UpdateCallback = function () {

        };
        UpdateCallback.prototype = {
            update: function ( node, nv ) {
                if ( node.isDirty() ) {
                    node.build();
                }
            }
        };
        this.setUpdateCallback( new UpdateCallback() );
        this.getOrCreateStateSet().setAttributeAndModes( new Depth( 'DISABLE' ) );
    };

    Composer.prototype = MACROUTILS.objectInehrit( Node.prototype, {
        dirty: function () {
            for ( var i = 0, l = this._stack.length; i < l; i++ ) {
                this._stack[ i ].filter.dirty();
            }
        },

        // addPass support different signature
        // addPass(filter) -> the filter will be done on a texture of the same size than the previous pass
        // addPass(filter, textureWidth, textureHeight) -> the filter will be done on a texture width and height
        // addPass(filter, texture) -> the filter will be done on the giver texture using its width and height
        addPass: function ( filter, arg0, arg1 ) {
            if ( arg0 instanceof Texture ) {
                this._stack.push( {
                    filter: filter,
                    texture: arg0
                } );
            } else if ( arg0 !== undefined && arg1 !== undefined ) {
                this._stack.push( {
                    filter: filter,
                    width: Math.floor( arg0 ),
                    height: Math.floor( arg1 )
                } );
            } else {
                this._stack.push( {
                    filter: filter
                } );
            }
        },
        renderToScreen: function ( w, h ) {
            this._renderToScreen = true;
            this._renderToScreenWidth = w;
            this._renderToScreenHeight = h;
        },

        isDirty: function () {
            for ( var i = 0, l = this._stack.length; i < l; i++ ) {
                if ( this._stack[ i ].filter.isDirty() ) {
                    return true;
                }
            }
            return false;
        },

        build: function () {
            var root = this;
            this.removeChildren();
            var lastTextureResult;
            var self = this;
            this._stack.forEach( function ( element, i, array ) {
                if ( element.filter.isDirty() ) {
                    element.filter.build();
                }
                var stateSet = element.filter.getStateSet();
                var w, h;
                if ( element.texture !== undefined ) {
                    w = element.texture.getWidth();
                    h = element.texture.getHeight();
                } else if ( element.width !== undefined && element.height !== undefined ) {
                    w = element.width;
                    h = element.height;
                } else {
                    // get width from Texture0
                    var inputTexture = stateSet.getTextureAttribute( 0, 'Texture' );
                    if ( inputTexture === undefined ) {
                        Notify.warn( 'Composer can\'t find any information to setup texture output size' );
                    }
                    w = inputTexture.getWidth();
                    h = inputTexture.getHeight();
                }

                // is it the last filter and we want to render to screen ?
                var lastFilterRenderToScreen = ( i === array.length - 1 &&
                    self._renderToScreen === true );

                // check if we have something to do
                // else we will just translate stateset to the next filter
                // this part exist to manage the Composer.Filter.InputTexture that setup the first texture unit
                if ( !lastFilterRenderToScreen ) {
                    if ( stateSet.getAttribute( 'Program' ) === undefined ) {
                        array[ i + 1 ].filter.getStateSet().setTextureAttributeAndModes( 0, stateSet.getTextureAttribute( 0, 'Texture' ) );
                        return;
                    }
                }

                // check if we want to render on screen
                var camera = new Camera();
                camera.setClearMask( 0 );

                var texture;
                var quad;
                if ( lastFilterRenderToScreen === true ) {
                    w = self._renderToScreenWidth;
                    h = self._renderToScreenHeight;
                } else {
                    camera.setRenderOrder( Camera.PRE_RENDER, 0 );
                    texture = element.texture;
                    if ( texture === undefined ) {
                        texture = new Texture();
                        texture.setTextureSize( w, h );
                    }
                    camera.attachTexture( FrameBufferObject.COLOR_ATTACHMENT0, texture, 0 );
                }

                var vp = new Viewport( 0, 0, w, h );
                var projection = Matrix.makeOrtho( -w / 2, w / 2, -h / 2, h / 2, -5, 5, [] );
                camera.setReferenceFrame( Transform.ABSOLUTE_RF );
                camera.setViewport( vp );
                camera.setProjectionMatrix( projection );
                camera.setStateSet( element.filter.getStateSet() );

                quad = Shape.createTexturedQuadGeometry( -w / 2, -h / 2, 0,
                    w, 0, 0,
                    0, h, 0 );

                if ( element.filter.buildGeometry !== undefined )
                    quad = element.filter.buildGeometry( quad );

                quad.setName( 'composer layer' );

                lastTextureResult = texture;

                // assign the result texture to the next stateset
                if ( i + 1 < array.length ) {
                    array[ i + 1 ].filter.getStateSet().setTextureAttributeAndModes( 0, lastTextureResult );
                }

                camera.addChild( quad );
                element.filter.getStateSet().addUniform( Uniform.createFloat2( [ w, h ], 'RenderSize' ) );
                camera.setName( 'Composer Pass' + i );
                root.addChild( camera );
            } );
            this._resultTexture = lastTextureResult;
        }
    } );

    Composer.Filter = function () {
        this._stateSet = new StateSet();
        this._dirty = true;
    };

    Composer.Filter.prototype = {
        getStateSet: function () {
            return this._stateSet;
        },
        getOrCreateStateSet: function () {
            return this._stateSet;
        },
        dirty: function () {
            this._dirty = true;
        },
        isDirty: function () {
            return this._dirty;
        }
    };


    Composer.Filter.defaultVertexShader = [
        '#ifdef GL_ES',
        'precision highp float;',
        '#endif',
        'attribute vec3 Vertex;',
        'attribute vec2 TexCoord0;',
        'varying vec2 FragTexCoord0;',
        'uniform mat4 ModelViewMatrix;',
        'uniform mat4 ProjectionMatrix;',
        'void main(void) {',
        '  gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(Vertex,1.0);',
        '  FragTexCoord0 = TexCoord0;',
        '}',
        ''
    ].join( '\n' );

    Composer.Filter.defaultFragmentShaderHeader = [
        '#ifdef GL_ES',
        'precision highp float;',
        '#endif',
        'varying vec2 FragTexCoord0;',
        'uniform vec2 RenderSize;',
        'uniform sampler2D Texture0;',
        ''
    ].join( '\n' );

    Composer.Filter.shaderUtils = [
        'vec4 packFloatTo4x8(in float v) {',
        'vec4 enc = vec4(1.0, 255.0, 65025.0, 160581375.0) * v;',
        'enc = fract(enc);',
        'enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);',
        'return enc;',
        '}',

        ' ',
        'vec4 pack2FloatTo4x8(in vec2 val) {',
        ' const vec2 bitSh = vec2(256.0, 1.0);',
        ' const vec2 bitMsk = vec2(0.0, 1.0/256.0);',
        ' vec2 res1 = fract(val.x * bitSh);',
        ' res1 -= res1.xx * bitMsk;',
        ' vec2 res2 = fract(val.y * bitSh);',
        ' res2 -= res2.xx * bitMsk;',
        ' return vec4(res1.x,res1.y,res2.x,res2.y);',
        '}',
        ' ',
        'float unpack4x8ToFloat( vec4 rgba ) {',
        ' return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/160581375.0) );',
        '}',
        ' ',
        'vec2 unpack4x8To2Float(in vec4 val) {',
        ' const vec2 unshift = vec2(1.0/256.0, 1.0);',
        ' return vec2(dot(val.xy, unshift), dot(val.zw, unshift));',
        '}',

        'vec2 encodeNormal (vec3 n)',
        '{',
        '    float f = sqrt(8.0*n.z+8.0);',
        '    return n.xy / f + 0.5;',
        '}',

        'vec3 decodeNormal (vec2 enc)',
        '{',
        '    vec2 fenc = enc*4.0-2.0;',
        '    float f = dot(fenc,fenc);',
        '    float g = sqrt(1.0-f/4.0);',
        '    vec3 n;',
        '    n.xy = fenc*g;',
        '    n.z = 1.0-f/2.0;',
        '    return n;',
        '}',
        ''
    ].join( '\n' );

    Composer.Filter.Helper = {
        getOrCreatePascalCoefficients: function () {
            var cache = Composer.Filter.Helper.getOrCreatePascalCoefficients.cache;
            if ( cache !== undefined ) {
                return cache;
            }

            cache = ( function ( kernelSize ) {
                var pascalTriangle = [
                    [ 1 ]
                ];
                for ( var j = 0; j < ( kernelSize - 1 ); j++ ) {
                    var sum = Math.pow( 2, j );
                    var currentRow = pascalTriangle[ j ];
                    var currentRowSize = currentRow.length;

                    var nextRowSize = currentRowSize + 1;
                    var nextRow = new Array( currentRowSize );
                    nextRow[ 0 ] = 1.0;
                    nextRow[ nextRowSize - 1 ] = 1.0;

                    var idx = 1;
                    for ( var p = 0; p < currentRowSize - 1; p++ ) {
                        var val = ( currentRow[ p ] + currentRow[ p + 1 ] );
                        nextRow[ idx++ ] = val;
                    }
                    pascalTriangle.push( nextRow );
                }

                // compute real coef dividing by sum
                ( function () {
                    for ( var a = 0; a < pascalTriangle.length; a++ ) {
                        var row = pascalTriangle[ a ];
                        //var str = '';

                        var sum = Math.pow( 2, a );
                        for ( var i = 0; i < row.length; i++ ) {
                            row[ i ] = row[ i ] / sum;
                            //str += row[i].toString() + ' ';
                        }
                        //console.log(str);
                    }
                } )();

                return pascalTriangle;
            } )( 20 );
            Composer.Filter.Helper.getOrCreatePascalCoefficients.cache = cache;
            return cache;
        }
    };

    Composer.Filter.Custom = function ( fragmentShader, uniforms ) {
        Composer.Filter.call( this );
        this._fragmentShader = fragmentShader;
        this._uniforms = uniforms;
        this._vertexShader = Composer.Filter.defaultVertexShader;
    };

    Composer.Filter.Custom.prototype = MACROUTILS.objectInehrit( Composer.Filter.prototype, {
        build: function () {

            var program = new Program(
                new Shader( 'VERTEX_SHADER', this._vertexShader ),
                new Shader( 'FRAGMENT_SHADER', this._fragmentShader ) );

            var self = this;
            if ( this._uniforms ) {
                var unitIndex = 0;

                var r = this._fragmentShader.match( /uniform\s+\w+\s+\w+/g );
                if ( r !== null ) {
                    for ( var i = 0, l = r.length; i < l; i++ ) {
                        var match = r[ i ].match( /uniform\s+(\w+)\s+(\w+)/ );
                        var uniform_type = match[ 1 ];
                        var uniform_name = match[ 2 ];
                        var uniform;

                        if ( this._uniforms[ uniform_name ] !== undefined ) {
                            uniform_value = this._uniforms[ uniform_name ];
                            if ( uniform_type.search( 'sampler' ) !== -1 ) {
                                this._stateSet.setTextureAttributeAndModes( unitIndex, uniform_value );
                                uniform = Uniform.createInt1( unitIndex, uniform_name );
                                unitIndex++;
                                this._stateSet.addUniform( uniform );
                            } else {
                                if ( Uniform.isUniform( uniform_value ) ) {
                                    uniform = uniform_value;
                                } else {
                                    uniform = Uniform[ uniform_type ]( this._uniforms[ uniform_name ], uniform_name );
                                }
                                this._stateSet.addUniform( uniform );
                            }
                        }
                    }
                }
            }
            this._stateSet.setAttributeAndModes( program );
            this._dirty = false;
        }
    } );



    Composer.Filter.AverageHBlur = function ( nbSamplesOpt ) {
        Composer.Filter.call( this );
        if ( nbSamplesOpt === undefined ) {
            this.setBlurSize( 5 );
        } else {
            this.setBlurSize( nbSamplesOpt );
        }
        this._pixelSize = 1.0;
    };

    Composer.Filter.AverageHBlur.prototype = MACROUTILS.objectInehrit( Composer.Filter.prototype, {
        setBlurSize: function ( nbSamples ) {
            if ( nbSamples % 2 !== 1 ) {
                nbSamples += 1;
            }
            this._nbSamples = nbSamples;
            this.dirty();
        },
        setPixelSize: function ( value ) {
            this._pixelSize = value;
            this.dirty();
        },
        getUVOffset: function ( value ) {
            return 'vec2(float(' + value + '), 0.0)/RenderSize[0];';
        },
        getShaderBlurKernel: function () {
            var nbSamples = this._nbSamples;
            var kernel = [];
            kernel.push( ' pixel = texture2D(Texture0, FragTexCoord0 );' );
            kernel.push( ' if (pixel.w == 0.0) { gl_FragColor = pixel; return; }' );
            kernel.push( ' vec2 offset;' );
            for ( var i = 1; i < Math.ceil( nbSamples / 2 ); i++ ) {
                kernel.push( ' offset = ' + this.getUVOffset( i * this._pixelSize ) );
                kernel.push( ' pixel += texture2D(Texture0, FragTexCoord0 + offset);' );
                kernel.push( ' pixel += texture2D(Texture0, FragTexCoord0 - offset);' );
            }
            kernel.push( ' pixel /= float(' + nbSamples + ');' );
            return kernel;
        },
        build: function () {
            var nbSamples = this._nbSamples;
            var vtx = Composer.Filter.defaultVertexShader;
            var fgt = [
                Composer.Filter.defaultFragmentShaderHeader,
                'uniform float width;',

                'void main (void)',
                '{',
                '  vec4 pixel;',
                this.getShaderBlurKernel().join( '\n' ),
                '  gl_FragColor = vec4(pixel);',
                '}',
                ''
            ].join( '\n' );

            var program = new Program(
                new Shader( 'VERTEX_SHADER', vtx ),
                new Shader( 'FRAGMENT_SHADER', fgt ) );

            if ( this._stateSet.getUniform( 'Texture0' ) === undefined ) {
                this._stateSet.addUniform( Uniform.createInt1( 0, 'Texture0' ) );
            }
            this._stateSet.setAttributeAndModes( program );
            this._dirty = false;
        }
    } );


    Composer.Filter.AverageVBlur = function ( nbSamplesOpt ) {
        Composer.Filter.AverageHBlur.call( this, nbSamplesOpt );
    };
    Composer.Filter.AverageVBlur.prototype = MACROUTILS.objectInehrit( Composer.Filter.AverageHBlur.prototype, {
        getUVOffset: function ( value ) {
            return 'vec2(0.0, float(' + value + '))/RenderSize[1];';
        }
    } );

    Composer.Filter.BilateralHBlur = function ( options ) {
        Composer.Filter.call( this );

        if ( options === undefined ) {
            options = {};
        }

        var nbSamplesOpt = options.nbSamples;
        var depthTexture = options.depthTexture;
        var radius = options.radius;

        if ( nbSamplesOpt === undefined ) {
            this.setBlurSize( 5 );
        } else {
            this.setBlurSize( nbSamplesOpt );
        }
        this._depthTexture = depthTexture;
        this._radius = Uniform.createFloat( 1.0, 'radius' );
        this._pixelSize = Uniform.createFloat( 1.0, 'pixelSize' );
        this.setRadius( radius );
    };

    Composer.Filter.BilateralHBlur.prototype = MACROUTILS.objectInehrit( Composer.Filter.prototype, {
        setBlurSize: function ( nbSamples ) {
            if ( nbSamples % 2 !== 1 ) {
                nbSamples += 1;
            }
            //Notify.log('BlurSize ' + nbSamples);
            this._nbSamples = nbSamples;
            this.dirty();
        },
        setPixelSize: function ( value ) {
            this._pixelSize.get()[ 0 ] = value;
            this._pixelSize.dirty();
        },
        setRadius: function ( radius ) {
            this._radius.get()[ 0 ] = radius; // *2.0;
            this._radius.dirty();
        },
        getUVOffset: function ( value ) {
            return 'vec2(0.0, float(' + value + ') * pixelSize )/RenderSize[1];';
        },
        getShaderBlurKernel: function () {
            var nbSamples = this._nbSamples;
            var kernel = [];
            kernel.push( ' pixel = texture2D(Texture0, FragTexCoord0 );' );
            kernel.push( ' if (pixel.w <= 0.0001) { gl_FragColor = vec4(1.0); return; }' );
            kernel.push( ' vec2 offset, tmpUV;' );
            kernel.push( ' depth = getDepthValue(texture2D(Texture1, FragTexCoord0 ));' );
            for ( var i = 1; i < Math.ceil( nbSamples / 2 ); i++ ) {
                kernel.push( ' offset = ' + this.getUVOffset( i ) );

                kernel.push( ' tmpUV =  FragTexCoord0 + offset;' );
                kernel.push( ' tmpDepth = getDepthValue(texture2D(Texture1, tmpUV ));' );
                kernel.push( ' if ( abs(depth-tmpDepth) < radius) {' );
                kernel.push( '   pixel += texture2D(Texture0, tmpUV);' );
                kernel.push( '   nbHits += 1.0;' );
                kernel.push( ' }' );

                kernel.push( ' tmpUV =  FragTexCoord0 - offset;' );
                kernel.push( ' tmpDepth = getDepthValue(texture2D(Texture1, tmpUV ));' );
                kernel.push( ' if ( abs(depth-tmpDepth) < radius) {' );
                kernel.push( '   pixel += texture2D(Texture0, tmpUV);' );
                kernel.push( '   nbHits += 1.0;' );
                kernel.push( ' }' );
            }
            kernel.push( ' pixel /= nbHits;' );
            return kernel;
        },
        build: function () {
            var nbSamples = this._nbSamples;
            var vtx = Composer.Filter.defaultVertexShader;
            var fgt = [
                Composer.Filter.defaultFragmentShaderHeader,
                'uniform sampler2D Texture1;',
                'uniform float width;',
                'uniform mat4 projection;',
                'uniform float radius;',
                'uniform float pixelSize;',

                'float znear,zfar,zrange;',
                '',
                Composer.Filter.shaderUtils,
                '',
                'float getDepthValue(vec4 v) {',
                '  float depth = unpack4x8ToFloat(v);',
                '  depth = depth*zrange+znear;',
                '  return -depth;',
                '}',

                'void main (void)',
                '{',
                '  vec4 pixel;',
                '  float depth, tmpDepth;',
                '  znear = projection[3][2] / (projection[2][2]-1.0);',
                '  zfar = projection[3][2] / (projection[2][2]+1.0);',
                '  zrange = zfar-znear;',
                '  float nbHits = 1.0;',

                this.getShaderBlurKernel().join( '\n' ),
                '  gl_FragColor = vec4(pixel);',
                '}',
                ''
            ].join( '\n' );

            var program = new Program(
                new Shader( 'VERTEX_SHADER', vtx ),
                new Shader( 'FRAGMENT_SHADER', fgt ) );

            if ( this._stateSet.getUniform( 'Texture0' ) === undefined ) {
                this._stateSet.addUniform( Uniform.createInt1( 0, 'Texture0' ) );
            }
            if ( this._stateSet.getUniform( 'Texture1' ) === undefined ) {
                this._stateSet.addUniform( Uniform.createInt1( 1, 'Texture1' ) );
            }
            this._stateSet.addUniform( this._radius );
            this._stateSet.addUniform( this._pixelSize );
            this._stateSet.setTextureAttributeAndModes( 1, this._depthTexture );
            this._stateSet.setAttributeAndModes( program );
            this._dirty = false;
        }
    } );

    Composer.Filter.BilateralVBlur = function ( options ) {
        Composer.Filter.BilateralHBlur.call( this, options );
    };

    Composer.Filter.BilateralVBlur.prototype = MACROUTILS.objectInehrit( Composer.Filter.BilateralHBlur.prototype, {
        getUVOffset: function ( value ) {
            return 'vec2(float(' + value + ')*pixelSize,0.0)/RenderSize[0];';
        }
    } );

    // InputTexture is a fake filter to setup the first texture
    // in the composer pipeline
    Composer.Filter.InputTexture = function ( texture ) {
        Composer.Filter.call( this );
        this._stateSet.setTextureAttributeAndModes( 0, texture );
    };
    Composer.Filter.InputTexture.prototype = MACROUTILS.objectInehrit( Composer.Filter.prototype, {
        build: function () {
            this._dirty = false;
        }
    } );

    // Operate a Gaussian horizontal blur
    Composer.Filter.HBlur = function ( nbSamplesOpt ) {
        Composer.Filter.call( this );
        if ( nbSamplesOpt === undefined ) {
            this.setBlurSize( 5 );
        } else {
            this.setBlurSize( nbSamplesOpt );
        }
    };

    Composer.Filter.HBlur.prototype = MACROUTILS.objectInehrit( Composer.Filter.prototype, {
        setBlurSize: function ( nbSamples ) {
            if ( nbSamples % 2 !== 1 ) {
                nbSamples += 1;
            }
            this._nbSamples = nbSamples;
            this.dirty();
        },
        getUVOffset: function ( value ) {
            return 'vec2(float(' + value + '), 0.0)/RenderSize[0];';
        },
        build: function () {
            var nbSamples = this._nbSamples;
            var vtx = Composer.Filter.defaultVertexShader;
            var pascal = Composer.Filter.Helper.getOrCreatePascalCoefficients();
            var weights = pascal[ nbSamples - 1 ];
            var start = Math.floor( nbSamples / 2.0 );
            var kernel = [];
            kernel.push( ' pixel += float(' + weights[ start ] + ')*texture2D(Texture0, FragTexCoord0 ).rgb;' );
            var offset = 1;
            kernel.push( ' vec2 offset;' );
            for ( var i = start + 1; i < nbSamples; i++ ) {
                var weight = weights[ i ];
                kernel.push( ' offset = ' + this.getUVOffset( i ) );
                offset++;
                kernel.push( ' pixel += ' + weight + '*texture2D(Texture0, FragTexCoord0 + offset).rgb;' );
                kernel.push( ' pixel += ' + weight + '*texture2D(Texture0, FragTexCoord0 - offset).rgb;' );
            }

            var fgt = [
                Composer.Filter.defaultFragmentShaderHeader,
                'uniform float width;',

                'void main (void)',
                '{',
                '  vec3 pixel;',
                kernel.join( '\n' ),
                '  gl_FragColor = vec4(pixel,1.0);',
                '}',
                ''
            ].join( '\n' );

            var program = new Program(
                new Shader( 'VERTEX_SHADER', vtx ),
                new Shader( 'FRAGMENT_SHADER', fgt ) );

            if ( this._stateSet.getUniform( 'Texture0' ) === undefined ) {
                this._stateSet.addUniform( Uniform.createInt1( 0, 'Texture0' ) );
            }
            this._stateSet.setAttributeAndModes( program );
            this._dirty = false;
        }
    } );

    // Operate a Gaussian vertical blur
    Composer.Filter.VBlur = function ( nbSamplesOpt ) {
        Composer.Filter.HBlur.call( this );
    };

    Composer.Filter.VBlur.prototype = MACROUTILS.objectInehrit( Composer.Filter.HBlur.prototype, {
        getUVOffset: function ( value ) {
            return 'vec2(0.0, float(' + value + '))/RenderSize[1];';
        }
    } );

    // Sobel filter
    // http://en.wikipedia.org/wiki/Sobel_operator
    Composer.Filter.SobelFilter = function () {
        Composer.Filter.call( this );
        this._color = Uniform.createFloat3( [ 1.0, 1.0, 1.0 ], 'color' );
        this._factor = Uniform.createFloat( 1.0, 'factor' );
    };

    Composer.Filter.SobelFilter.prototype = MACROUTILS.objectInehrit( Composer.Filter.prototype, {
        setColor: function ( color ) {
            this._color.get()[ 0 ] = color[ 0 ];
            this._color.get()[ 1 ] = color[ 1 ];
            this._color.get()[ 2 ] = color[ 2 ];
            this._color.dirty();
        },
        setFactor: function ( f ) {
            this._factor.get()[ 0 ] = f;
            this._factor.dirty();
        },
        build: function () {
            var stateSet = this._stateSet;
            var vtx = Composer.Filter.defaultVertexShader;
            var fgt = [
                '',
                Composer.Filter.defaultFragmentShaderHeader,
                'uniform vec3 color;',
                'uniform float factor;',
                'void main (void)',
                '{',
                '  float fac0 = 2.0;',
                '  float fac1 = 1.0;',
                '  float offsetx = 1.0/RenderSize[0];',
                '  float offsety = 1.0/RenderSize[1];',
                '  vec4 texel0 = texture2D(Texture0, FragTexCoord0 + vec2(offsetx, offsety));',
                '  vec4 texel1 = texture2D(Texture0, FragTexCoord0 + vec2(offsetx, 0.0));',
                '  vec4 texel2 = texture2D(Texture0, FragTexCoord0 + vec2(offsetx, -offsety));',
                '  vec4 texel3 = texture2D(Texture0, FragTexCoord0 + vec2(0.0, -offsety));',
                '  vec4 texel4 = texture2D(Texture0, FragTexCoord0 + vec2(-offsetx, -offsety));',
                '  vec4 texel5 = texture2D(Texture0, FragTexCoord0 + vec2(-offsetx, 0.0));',
                '  vec4 texel6 = texture2D(Texture0, FragTexCoord0 + vec2(-offsetx, offsety));',
                '  vec4 texel7 = texture2D(Texture0, FragTexCoord0 + vec2(0.0, offsety));',
                '  vec4 rowx = -fac0*texel5 + fac0*texel1 +  -fac1*texel6 + fac1*texel0 + -fac1*texel4 + fac1*texel2;',
                '  vec4 rowy = -fac0*texel3 + fac0*texel7 +  -fac1*texel4 + fac1*texel6 + -fac1*texel2 + fac1*texel0;',
                '  float mag = sqrt(dot(rowy,rowy)+dot(rowx,rowx));',
                '  if (mag < 1.0/255.0) { discard; return; }',
                '  mag *= factor;',
                '  mag = min(1.0, mag);',
                '  gl_FragColor = vec4(color*mag,mag);',
                '}',
                ''
            ].join( '\n' );

            var program = new Program(
                new Shader( 'VERTEX_SHADER', vtx ),
                new Shader( 'FRAGMENT_SHADER', fgt ) );

            stateSet.setAttributeAndModes( program );
            stateSet.addUniform( this._color );
            stateSet.addUniform( this._factor );
            stateSet.addUniform( Uniform.createInt1( 0, 'Texture0' ) );
            this._dirty = false;
        }
    } );



    Composer.Filter.BlendMix = function () {
        Composer.Filter.call( this );
        var texture0, texture1, mixValue;
        var unit0 = 0;
        var unit1 = 1;
        var stateSet = this._stateSet;
        if ( arguments.length === 3 ) {
            texture0 = arguments[ 0 ];
            texture1 = arguments[ 1 ];
            mixValue = arguments[ 2 ];
            unit0 = 1;
            unit1 = 2;
            stateSet.setTextureAttributeAndModes( unit0, texture0 );
        } else if ( arguments.length === 2 ) {
            texture1 = arguments[ 0 ];
            mixValue = arguments[ 1 ];
        } else if ( arguments.length === 1 ) {
            texture1 = arguments[ 0 ];
            mixValue = 0.5;
        }
        stateSet.setTextureAttributeAndModes( unit1, texture1 );
        stateSet.addUniform( Uniform.createInt1( unit0, 'Texture0' ) );
        stateSet.addUniform( Uniform.createInt1( unit1, 'Texture1' ) );
        this._mixValueUniform = Uniform.createFloat1( mixValue, 'MixValue' );
        stateSet.addUniform( mixValueUniform );
    };

    Composer.Filter.BlendMix = MACROUTILS.objectInehrit( Composer.Filter.prototype, {
        getBlendFactorUniform: function () {
            return this._mixValueUniform;
        },

        build: function () {
            var stateSet = this._stateSet;
            var vtx = Composer.Filter.defaultVertexShader;
            var fgt = [
                '',
                Composer.Filter.defaultFragmentShaderHeader,
                'uniform sampler2D Texture1;',
                'uniform float MixValue;',

                'void main (void)',
                '{',
                '  gl_FragColor = mix(texture2D(Texture0,FragTexCoord0), texture2D(Texture1,FragTexCoord0),MixValue);',
                '}',
                ''
            ].join( '\n' );

            var program = new Program(
                new Shader( 'VERTEX_SHADER', vtx ),
                new Shader( 'FRAGMENT_SHADER', fgt ) );

            stateSet.setAttributeAndModes( program );
            this._dirty = false;
        }
    } );


    Composer.Filter.BlendMultiply = function () {
        Composer.Filter.call( this );
        var stateSet = this._stateSet;
        var texture0, texture1, mixValue;
        var unit0 = 0;
        var unit1 = 1;
        if ( arguments.length === 2 ) {
            texture0 = arguments[ 0 ];
            texture1 = arguments[ 1 ];
            unit0 = 1;
            unit0 = 2;
            stateSet.setTextureAttributeAndModes( unit0, texture0 );
        } else if ( arguments.length === 1 ) {
            texture1 = arguments[ 0 ];
        }
        stateSet.setTextureAttributeAndModes( unit1, texture1 );
        stateSet.addUniform( Uniform.createInt1( unit0, 'Texture0' ) );
        stateSet.addUniform( Uniform.createInt1( unit1, 'Texture1' ) );
    };

    Composer.Filter.BlendMultiply.prototype = MACROUTILS.objectInehrit( Composer.Filter.prototype, {
        build: function () {
            var vtx = Composer.Filter.defaultVertexShader;
            var fgt = [
                '',
                Composer.Filter.defaultFragmentShaderHeader,
                'uniform sampler2D Texture1;',
                'uniform float MixValue;',

                'void main (void)',
                '{',
                '  gl_FragColor = texture2D(Texture0,FragTexCoord0)*texture2D(Texture1,FragTexCoord0);',
                '}',
                ''
            ].join( '\n' );

            var program = new Program(
                new Shader( 'VERTEX_SHADER', vtx ),
                new Shader( 'FRAGMENT_SHADER', fgt ) );

            this._stateSet.setAttributeAndModes( program );
            this._dirty = false;
        }
    } );

    Composer.Filter.SSAO = function ( options ) {
        Composer.Filter.call( this );

        var stateSet = this._stateSet;
        var nbSamples = 16;
        var radius = 0.05;
        if ( options !== undefined ) {
            if ( options.nbSamples !== undefined )
                nbSamples = options.nbSamples;

            if ( options.radius !== undefined )
                radius = options.radius;
        }

        var textureNormal = options.normal;
        var texturePosition = options.position;
        this._radius = radius;
        this._nbSamples = nbSamples;
        this._noiseTextureSize = 16;
        this._sceneRadius = 2.0;

        stateSet.addUniform( Uniform.createFloat1( 1.0, 'Power' ) );
        stateSet.addUniform( Uniform.createFloat1( radius, 'Radius' ) );
        stateSet.addUniform( Uniform.createInt1( 0, 'Texture0' ) );
        stateSet.addUniform( Uniform.createInt1( 1, 'Texture1' ) );
        stateSet.addUniform( Uniform.createInt1( 2, 'Texture2' ) );
        stateSet.addUniform( Uniform.createFloat1( 0.1, 'AngleLimit' ) );

        var w = textureNormal.getWidth();
        var h = textureNormal.getHeight();
        this._size = [ w, h ];

        stateSet.setTextureAttributeAndModes( 0, textureNormal );
        stateSet.setTextureAttributeAndModes( 1, texturePosition );

        this.initNoise();

    };

    Composer.Filter.SSAO.prototype = MACROUTILS.objectInehrit( Composer.Filter.prototype, {

        initNoise: function () {
            var sizeNoise = this._noiseTextureSize;
            var noise = new Array( sizeNoise * sizeNoise * 3 );
            ( function ( array ) {
                for ( var i = 0; i < sizeNoise * sizeNoise; i++ ) {
                    var x, y, z;
                    x = 2.0 * ( Math.random() - 0.5 );
                    y = 2.0 * ( Math.random() - 0.5 );
                    z = 0.0;

                    var n = Vec3.normalize( [ x, y, z ], [] );
                    array[ i * 3 + 0 ] = 255 * ( n[ 0 ] * 0.5 + 0.5 );
                    array[ i * 3 + 1 ] = 255 * ( n[ 1 ] * 0.5 + 0.5 );
                    array[ i * 3 + 2 ] = 255 * ( n[ 2 ] * 0.5 + 0.5 );
                }
            } )( noise );

            var noiseTexture = new Texture();
            noiseTexture.setWrapS( 'REPEAT' );
            noiseTexture.setWrapT( 'REPEAT' );
            noiseTexture.setMinFilter( 'NEAREST' );
            noiseTexture.setMagFilter( 'NEAREST' );

            noiseTexture.setTextureSize( sizeNoise, sizeNoise );
            noiseTexture.setImage( new Uint8Array( noise ), 'RGB' );
            this._noiseTexture = noiseTexture;
        },
        setSceneRadius: function ( value ) {
            this._sceneRadius = value;
            this.dirty();
        },
        setAngleLimit: function ( value ) {
            var uniform = this._stateSet.getUniform( 'AngleLimit' );
            uniform.get()[ 0 ] = value;
            uniform.dirty();
        },
        setNbSamples: function ( value ) {
            if ( value === this._nbSamples ) {
                return;
            }
            this._nbSamples = Math.floor( value );
            this.dirty();
        },
        setRadius: function ( value ) {
            var uniform = this._stateSet.getUniform( 'Radius' );
            uniform.get()[ 0 ] = value;
            uniform.dirty();
        },
        setPower: function ( value ) {
            var uniform = this._stateSet.getUniform( 'Power' );
            uniform.get()[ 0 ] = value;
            uniform.dirty();
        },
        build: function () {
            var stateSet = this._stateSet;
            var nbSamples = this._nbSamples;
            var kernel = new Array( nbSamples * 4 );
            ( function ( array ) {
                for ( var i = 0; i < nbSamples; i++ ) {
                    var x, y, z;
                    x = 2.0 * ( Math.random() - 0.5 );
                    y = 2.0 * ( Math.random() - 0.5 );
                    z = Math.random();

                    var v = Vec3.normalize( [ x, y, z ], [] );
                    var scale = Math.max( i / nbSamples, 0.1 );
                    scale = 0.1 + ( 1.0 - 0.1 ) * ( scale * scale );
                    array[ i * 3 + 0 ] = v[ 0 ];
                    array[ i * 3 + 1 ] = v[ 1 ];
                    array[ i * 3 + 2 ] = v[ 2 ];
                    array[ i * 3 + 3 ] = scale;
                }
            } )( kernel );


            stateSet.setTextureAttributeAndModes( 2, this._noiseTexture );
            var uniform = stateSet.getUniform( 'noiseSampling' );
            if ( uniform === undefined ) {
                uniform = Uniform.createFloat2( [ this._size[ 0 ] / this._noiseTextureSize, this._size[ 1 ] / this._noiseTextureSize ], 'noiseSampling' );
                stateSet.addUniform( uniform );
            } else {
                uniform.set( [ this._size[ 0 ] / this._noiseTextureSize, this._size[ 1 ] / this._noiseTextureSize ] );
                uniform.dirty();
            }
            var vertexshader = [
                '',
                '#ifdef GL_ES',
                'precision highp float;',
                '#endif',
                'attribute vec3 Vertex;',
                'attribute vec2 TexCoord0;',
                'varying vec2 FragTexCoord0;',
                'uniform mat4 ModelViewMatrix;',
                'uniform mat4 ProjectionMatrix;',
                'void main(void) {',
                '  gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(Vertex,1.0);',
                '  FragTexCoord0 = TexCoord0;',
                '}',
                ''
            ].join( '\n' );

            var kernelglsl = [];
            for ( var i = 0; i < nbSamples; i++ ) {
                kernelglsl.push( 'kernel[' + i + '] = vec4(' + kernel[ i * 3 ] + ',' + kernel[ i * 3 + 1 ] + ', ' + kernel[ i * 3 + 2 ] + ', ' + kernel[ i * 3 + 3 ] + ');' );
            }
            kernelglsl = kernelglsl.join( '\n' );

            var ssaoRadiusMin = this._sceneRadius * 0.002;
            var ssaoRadiusMax = this._sceneRadius * 0.05;
            var ssaoRadiusStep = ( ssaoRadiusMax - ssaoRadiusMin ) / 200.0;

            var fragmentshader = [
                '',
                Composer.Filter.defaultFragmentShaderHeader,
                'uniform sampler2D Texture1;',
                'uniform sampler2D Texture2;',
                'uniform mat4 projection;',
                'uniform vec2 noiseSampling;',
                'uniform float Power;', //'+ '{ 'min': 0.1, 'max': 16.0, 'step': 0.1, 'value': 1.0 }',
                'uniform float Radius;', //'+ '{ 'min': ' + ssaoRadiusMin +', 'max': ' + ssaoRadiusMax + ', 'step': '+ ssaoRadiusStep + ', 'value': 0.01 }',
                'uniform float AngleLimit;',
                '#define NB_SAMPLES ' + this._nbSamples,
                'float depth;',
                'vec3 normal;',
                'vec4 position;',
                'vec4 kernel[' + nbSamples + '];',


                'mat3 computeBasis()',
                '{',
                '  vec2 uvrand = FragTexCoord0*noiseSampling;',
                '  vec3 rvec = texture2D(Texture2, uvrand*2.0).xyz*2.0-vec3(1.0);',
                '  vec3 tangent = normalize(rvec - normal * dot(rvec, normal));',
                '  vec3 bitangent = cross(normal, tangent);',
                '  mat3 tbn = mat3(tangent, bitangent, normal);',
                '  return tbn;',
                '}',

                'void main (void)',
                '{',
                kernelglsl,
                '  position = texture2D(Texture1, FragTexCoord0);',
                '  vec4 p = texture2D(Texture0, FragTexCoord0);',
                '  depth = p.w;',
                '  normal = vec3(p);',
                '  if ( position.w == 0.0) {',
                '     gl_FragColor = vec4(1.0,1.0,1.0,0.0);',
                '     return;',
                '  }',
                '',
                ' mat3 tbn = computeBasis();',
                ' float occlusion = 0.0;',
                ' for (int i = 0; i < NB_SAMPLES; i++) {',
                '    vec3 vecKernel = vec3(kernel[i]);',
                '    vecKernel[2] = max(AngleLimit,vecKernel[2]);',
                '    vec3 sample = tbn * vecKernel;',
                '    vec3 dir = sample;',
                '    float w = dot(dir, normal);',
                '    float dist = 1.0-kernel[i].w;',
                '    w *= dist*dist*Power;',
                '    sample = dir * float(Radius) + position.xyz;',

                '    vec4 offset = projection * vec4(sample,1.0);',
                '    offset.xy /= offset.w;',
                '    offset.xy = offset.xy * 0.5 + 0.5;',

                '    float sample_depth = texture2D(Texture1, offset.xy).z;',
                '    float range_check = abs(sample.z - sample_depth) < float(Radius) ? 1.0 : 0.0;',
                '    occlusion += (sample_depth > sample.z ? 1.0 : 0.0) * range_check*w;',

                ' }',
                ' occlusion = 1.0 - (occlusion / float(NB_SAMPLES));',
                ' gl_FragColor = vec4(vec3(occlusion),1.0);',
                '}',
                ''
            ].join( '\n' );

            var program = new Program(
                new Shader( 'VERTEX_SHADER', vertexshader ),
                new Shader( 'FRAGMENT_SHADER', fragmentshader ) );

            stateSet.setAttributeAndModes( program );
            this._dirty = false;
        }
    } );



    Composer.Filter.SSAO8 = function ( options ) {
        Composer.Filter.SSAO.call( this, options );
    };

    Composer.Filter.SSAO8.prototype = MACROUTILS.objectInehrit( Composer.Filter.SSAO.prototype, {
        buildGeometry: function ( quad ) {
            quad.getAttributes().TexCoord1 = this._texCoord1;
            return quad;
        },
        build: function () {
            var stateSet = this._stateSet;
            var nbSamples = this._nbSamples;
            var kernel = new Array( nbSamples * 4 );
            var angleLimit = this._angleLimit;
            ( function ( array ) {
                for ( var i = 0; i < nbSamples; i++ ) {
                    var x, y, z;
                    x = 2.0 * ( Math.random() - 0.5 );
                    y = 2.0 * ( Math.random() - 0.5 );
                    z = Math.random();

                    var v = Vec3.normalize( [ x, y, z ], [] );
                    var scale = Math.max( i / nbSamples, 0.1 );
                    scale = 0.1 + ( 1.0 - 0.1 ) * ( scale * scale );
                    array[ i * 3 + 0 ] = v[ 0 ];
                    array[ i * 3 + 1 ] = v[ 1 ];
                    array[ i * 3 + 2 ] = v[ 2 ];
                    array[ i * 3 + 3 ] = scale;
                }
            } )( kernel );

            var sizeNoise = this._noiseTextureSize;
            stateSet.setTextureAttributeAndModes( 2, this._noiseTexture );
            var uniform = stateSet.getUniform( 'noiseSampling' );
            if ( uniform === undefined ) {
                uniform = Uniform.createFloat2( [ this._size[ 0 ] / this._noiseTextureSize, this._size[ 1 ] / this._noiseTextureSize ], 'noiseSampling' );
                stateSet.addUniform( uniform );
            } else {
                uniform.set( [ this._size[ 0 ] / this._noiseTextureSize, this._size[ 1 ] / this._noiseTextureSize ] );
                uniform.dirty();
            }
            var vertexshader = [
                '',
                '#ifdef GL_ES',
                'precision highp float;',
                '#endif',
                'attribute vec3 Vertex;',
                'attribute vec2 TexCoord0;',
                'attribute vec3 TexCoord1;',
                'varying vec2 FragTexCoord0;',
                'varying vec3 FragTexCoord1;',
                'uniform mat4 ModelViewMatrix;',
                'uniform mat4 ProjectionMatrix;',
                'void main(void) {',
                '  gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(Vertex,1.0);',
                '  FragTexCoord0 = TexCoord0;',
                '  FragTexCoord1 = TexCoord1;',
                '}',
                ''
            ].join( '\n' );

            var kernelglsl = [];
            for ( var i = 0; i < nbSamples; i++ ) {
                kernelglsl.push( 'kernel[' + i + '] = vec4(' + kernel[ i * 3 ] + ',' + kernel[ i * 3 + 1 ] + ', ' + kernel[ i * 3 + 2 ] + ', ' + kernel[ i * 3 + 3 ] + ');' );
            }
            kernelglsl = kernelglsl.join( '\n' );

            var ssaoRadiusMin = this._sceneRadius * 0.002;
            var ssaoRadiusMax = this._sceneRadius * 0.05;
            var ssaoRadiusStep = ( ssaoRadiusMax - ssaoRadiusMin ) / 200.0;

            var fragmentshader = [
                '',
                Composer.Filter.defaultFragmentShaderHeader,
                'varying vec3 FragTexCoord1;',
                'uniform sampler2D Texture1;',
                'uniform sampler2D Texture2;',
                'uniform mat4 projection;',
                'uniform vec2 noiseSampling;',
                'uniform float Power;', //'+ '{ 'min': 0.1, 'max': 16.0, 'step': 0.1, 'value': 1.0 }',
                'uniform float Radius;', //'+ '{ 'min': ' + ssaoRadiusMin +', 'max': ' + ssaoRadiusMax + ', 'step': '+ ssaoRadiusStep + ', 'value': 0.01 }',
                'uniform float AngleLimit;',
                '#define NB_SAMPLES ' + this._nbSamples,
                'float depth;',
                'float znear, zfar, zrange;',
                'vec3 normal;',
                'vec3 position;',
                'vec4 kernel[' + nbSamples + '];',

                Composer.Filter.shaderUtils,

                'mat3 computeBasis()',
                '{',
                '  vec2 uvrand = FragTexCoord0*noiseSampling;',
                '  //uvrand = rand(gl_FragCoord.xy);',
                '  vec3 rvec = texture2D(Texture2, uvrand*2.0).xyz*2.0-vec3(1.0);',
                '  //vec3 rvec = normalize(vec3(uvrand,0.0));',
                '  vec3 tangent = normalize(rvec - normal * dot(rvec, normal));',
                '  vec3 bitangent = cross(normal, tangent);',
                '  mat3 tbn = mat3(tangent, bitangent, normal);',
                '  return tbn;',
                '}',

                'float getDepthValue(vec4 v) {',
                '  float depth = unpack4x8ToFloat(v);',
                '  depth = depth*zrange+znear;',
                '  //depth = depth*zrange;',
                '  return -depth;',
                '}',

                'void main (void)',
                '{',
                kernelglsl,
                '  vec4 p = texture2D(Texture0, FragTexCoord0);',
                '  if (dot(p,p) < 0.001) { ',
                '     gl_FragColor = vec4(1.0,1.0,1.0,0.0);',
                '     return;',
                '  }',
                '  znear = projection[3][2] / (projection[2][2]-1.0);',
                '  zfar = projection[3][2] / (projection[2][2]+1.0);',
                '  zrange = zfar-znear;',
                '  depth = getDepthValue(texture2D(Texture1, FragTexCoord0));',
                //B = (A - znear)/(zfar-znear);',
                //B = A/(zfar-znear) - znear/(zfar-znear);',
                //B+ znear/(zfar-znear) = A/(zfar-znear) ;',
                //(zfar-znear)*(B+ znear/(zfar-znear)) = A ;',
                //(zfar-znear)*B+ znear = A ;',

                '  if ( -depth < znear) {',
                '     gl_FragColor = vec4(1.0,1.0,1.0,0.0);',
                '     return;',
                '  }',

                '  normal = decodeNormal(unpack4x8To2Float(p));',

                '  position = -FragTexCoord1*depth;',
                '  position.z = -position.z;',

                '',
                ' mat3 tbn = computeBasis();',
                ' float occlusion = 0.0;',
                ' for (int i = 0; i < NB_SAMPLES; i++) {',
                '    vec3 vecKernel = vec3(kernel[i]);',
                '    vecKernel[2] = max(AngleLimit,vecKernel[2]);',
                '    vec3 sample = tbn * vec3(vecKernel);',
                '    vec3 dir = sample;',
                '    float w = dot(dir, normal);',
                '    float dist = 1.0-kernel[i].w;',
                '    w *= dist*dist*Power;',
                '    sample = dir * float(Radius) + position.xyz;',

                '    vec4 offset = projection * vec4(sample,1.0);',
                '    offset.xy /= offset.w;',
                '    offset.xy = offset.xy * 0.5 + 0.5;',

                '    float sample_depth = getDepthValue(texture2D(Texture1, offset.xy));',
                '    float range_check = abs(sample.z - sample_depth) < float(Radius) ? 1.0 : 0.0;',
                '    occlusion += (sample_depth > sample.z ? 1.0 : 0.0) * range_check*w;',

                ' }',
                ' occlusion = 1.0 - (occlusion / float(NB_SAMPLES));',
                ' gl_FragColor = vec4(vec3(occlusion),1.0);',
                '}',
                ''
            ].join( '\n' );

            var program = new Program(
                new Shader( 'VERTEX_SHADER', vertexshader ),
                new Shader( 'FRAGMENT_SHADER', fragmentshader ) );

            stateSet.setAttributeAndModes( program );
            this._dirty = false;
        }
    } );

    return Composer;
} );
/*global define */

define( [], function () {

    /** -*- compile-command: "jslint-cli osgUtil.js" -*-
     * Authors:
     *  Tuan.kuranes <tuan.kuranes@gmail.com> Jerome Etienne <Jerome.etienne@gmail.com>
     */

    var osgPool = {};
    osgPool.memoryPools = {};

    /*
     *  TODO: Add stats & reports for developper per application  finer calibration (max, min, average)
     *  TODO: Debug Mode: check if not putting object twice, etc.
     *  USAGE: osg.memoryPools.stateGraph = new OsgObjectMemoryPool(osg.StateGraph).grow(50);
     */
    osgPool.OsgObjectMemoryPool = function ( pooledObjectClassName ) {
        return {
            _memPool: [],
            reset: function () {
                this._memPool = [];
                return this;
            },
            put: function ( obj ) {
                this._memPool.push( obj );
            },
            get: function () {
                if ( this._memPool.length > 0 ) return this._memPool.pop();
                this.grow();
                return this.get();
            },
            grow: function ( sizeAdd ) {
                if ( sizeAdd === undefined ) sizeAdd = ( this._memPool.length > 0 ) ? this._memPool.length * 2 : 20;
                var i = this._memPool.length;
                while ( i++ < sizeAdd ) this._memPool.push( new pooledObjectClassName() );
                return this;
            }
        };
    };

    /*
     *  TODO: the same for  TypedArrays.
     *  TODO: Add stats reports for developper per application  finer calibration (max, min, average)
     *  TODO: Debug Mode: check if not putting object twice, etc.
     *  USAGE: osg.memoryPools.arrayPool = new OsgArrayMemoryPool();
     *  mymatrix = osg.memoryPools.arrayPool.get(16);
     *  // do use matrix, etc..
     *  osg.memoryPools.arrayPool.put(mymatrix);
     */
    osgPool.OsgArrayMemoryPool = function () {
        return {
            _mempoolofPools: [],
            reset: function () {
                this._memPoolofPools = {};
                return this;
            },
            put: function ( obj ) {
                if ( !this._memPoolofPools[ obj.length ] )
                    this._memPoolofPools[ obj.length ] = [];
                this._memPoolofPools[ obj.length ].push( obj );
            },
            get: function ( arraySize ) {
                if ( !this._memPoolofPools[ arraySize ] )
                    this._memPoolofPools[ arraySize ] = [];
                else if ( this._memPoolofPools.length > 0 )
                    return this._memPool.pop();
                this.grow( arraySize );
                return this.get();
            },
            grow: function ( arraySize, sizeAdd ) {
                if ( sizeAdd === undefined ) sizeAdd = ( this._memPool.length > 0 ) ? this._memPool.length * 2 : 20;
                var i = this._memPool.length;
                while ( i++ < sizeAdd ) this._memPool.push( new Array( arraySize ) );
                return this;
            }
        };
    };

    return osgPool;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'vendors/Q',
    'osg/Texture',
    'osg/Uniform',
    'osg/BlendFunc',
    'osg/Material',
    'osg/Geometry',
    'osg/BufferArray',
    'osg/PrimitiveSet',
    'osg/DrawArrays',
    'osg/DrawElements',
    'osg/StateSet',
    'osg/Node',
    'osg/Matrix',
    'osg/MatrixTransform',
    'osg/Projection',
    'osgDB/Input'
], function ( Notify, MACROUTILS, Q, Texture, Uniform, BlendFunc, Material, Geometry, BufferArray, PrimitiveSet, DrawArrays, DrawElements, StateSet, Node, Matrix, MatrixTransform, Projection, Input ) {


    /** -*- compile-command: 'jslint-cli osgDB.js' -*-
     *
     *  Copyright (C) 2010 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */

    var osgDB = {};
    osgDB.Input = Input;

    osgDB.ObjectWrapper = {};
    osgDB.ObjectWrapper.serializers = {};

    osgDB.readImage = function ( url, options ) {
        return osgDB.registry().readImageURL( url, options );
    };
    osgDB.readImageURL = osgDB.readImage; // alias

    osgDB.readNodeURL = function ( url, options ) {
        return osgDB.registry().readNodeURL( url, options );
    };

    osgDB.registry = function () {
        if ( osgDB.registry._input === undefined ) {
            osgDB.registry._input = new Input();
        }
        return osgDB.registry._input;
    };

    // stop on input with options
    // how we transfer options from registry to serializer


    osgDB.parseSceneGraph = function ( node, options ) {
        if ( node.Version !== undefined && node.Version > 0 ) {

            var getPropertyValue = function ( o ) {
                var props = Object.keys( o );
                for ( var i = 0, l = props.length; i < l; i++ ) {
                    if ( props[ i ] !== 'Generator' && props[ i ] !== 'Version' ) {
                        return props[ i ];
                    }
                }
                return undefined;
            };

            var key = getPropertyValue( node );
            if ( key ) {
                var obj = {};
                obj[ key ] = node[ key ];
                var input = new Input( obj );
                input.setImageLoadingOptions( osgDB.registry().getImageLoadingOptions() );
                if ( options !== undefined ) {
                    input.setProgressXHRCallback( options.progressXHRCallback );
                    input.setPrefixURL( options.prefixURL );
                }
                return input.readObject();
                //return osgDB.ObjectWrapper.readObject(obj);
            } else {
                Notify.log( 'can\'t parse scenegraph ' + node );
            }
        } else {
            return osgDB.parseSceneGraph_deprecated( node );
        }
    };
    osgDB.parseSceneGraph_deprecated = function ( node ) {
        var getFieldBackwardCompatible = function ( field, json ) {
            var value = json[ field ];
            if ( value === undefined ) {
                value = json[ field.toLowerCase() ];
            }
            return value;
        };
        var setName = function ( osgjs, json ) {
            var name = getFieldBackwardCompatible( 'Name', json );
            if ( name && osgjs.setName !== undefined ) {
                osgjs.setName( name );
            }
        };

        var setMaterial = function ( osgjs, json ) {
            setName( osgjs, json );
            osgjs.setAmbient( getFieldBackwardCompatible( 'Ambient', json ) );
            osgjs.setDiffuse( getFieldBackwardCompatible( 'Diffuse', json ) );
            osgjs.setEmission( getFieldBackwardCompatible( 'Emission', json ) );
            osgjs.setSpecular( getFieldBackwardCompatible( 'Specular', json ) );
            osgjs.setShininess( getFieldBackwardCompatible( 'Shininess', json ) );
        };

        var setBlendFunc = function ( osgjs, json ) {
            setName( osgjs, json );
            osgjs.setSourceRGB( json.SourceRGB );
            osgjs.setSourceAlpha( json.SourceAlpha );
            osgjs.setDestinationRGB( json.DestinationRGB );
            osgjs.setDestinationAlpha( json.DestinationAlpha );
        };

        var setTexture = function ( osgjs, json ) {
            var magFilter = json.MagFilter || json.mag_filter || undefined;
            if ( magFilter ) {
                osgjs.setMagFilter( magFilter );
            }
            var minFilter = json.MinFilter || json.min_filter || undefined;
            if ( minFilter ) {
                osgjs.setMinFilter( minFilter );
            }
            var wrapT = json.WrapT || json.wrap_t || undefined;
            if ( wrapT ) {
                osgjs.setWrapT( wrapT );
            }
            var wrapS = json.WrapS || json.wrap_s || undefined;
            if ( wrapS ) {
                osgjs.setWrapS( wrapS );
            }
            var file = getFieldBackwardCompatible( 'File', json );
            Q.when( osgDB.readImage( file ) ).then(
                function ( img ) {
                    osgjs.setImage( img );
                } );
        };

        var setStateSet = function ( osgjs, json ) {
            setName( osgjs, json );
            var textures = getFieldBackwardCompatible( 'Textures', json ) || getFieldBackwardCompatible( 'TextureAttributeList', json ) || undefined;
            if ( textures ) {
                for ( var t = 0, tl = textures.length; t < tl; t++ ) {
                    var file = getFieldBackwardCompatible( 'File', textures[ t ] );
                    if ( !file ) {
                        Notify.log( 'no texture on unit ' + t + ' skip it' );
                        continue;
                    }
                    var tex = new Texture();
                    setTexture( tex, textures[ t ] );

                    osgjs.setTextureAttributeAndMode( t, tex );
                    osgjs.addUniform( Uniform.createInt1( t, 'Texture' + t ) );
                }
            }

            var blendfunc = getFieldBackwardCompatible( 'BlendFunc', json );
            if ( blendfunc ) {
                var newblendfunc = new BlendFunc();
                setBlendFunc( newblendfunc, blendfunc );
                osgjs.setAttributeAndMode( newblendfunc );
            }

            var material = getFieldBackwardCompatible( 'Material', json );
            if ( material ) {
                var newmaterial = new Material();
                setMaterial( newmaterial, material );
                osgjs.setAttributeAndMode( newmaterial );
            }
        };


        var newnode;
        var children = node.children;
        var primitives = node.primitives || node.Primitives || undefined;
        var attributes = node.attributes || node.Attributes || undefined;
        if ( primitives || attributes ) {
            newnode = new Geometry();

            setName( newnode, node );

            MACROUTILS.extend( newnode, node ); // we should not do that
            node = newnode;
            node.primitives = primitives; // we should not do that
            node.attributes = attributes; // we should not do that

            var i;
            for ( var p = 0, lp = primitives.length; p < lp; p++ ) {
                var mode = primitives[ p ].mode;
                if ( primitives[ p ].indices ) {
                    var array = primitives[ p ].indices;
                    array = new BufferArray( BufferArray[ array.type ], array.elements, array.itemSize );
                    if ( !mode ) {
                        mode = gl.TRIANGLES;
                    } else {
                        mode = PrimitiveSet[ mode ];
                    }
                    primitives[ p ] = new DrawElements( mode, array );
                } else {
                    mode = gl[ mode ];
                    var first = primitives[ p ].first;
                    var count = primitives[ p ].count;
                    primitives[ p ] = new DrawArrays( mode, first, count );
                }
            }

            for ( var key in attributes ) {
                if ( attributes.hasOwnProperty( key ) ) {
                    var attributeArray = attributes[ key ];
                    attributes[ key ] = new BufferArray( gl[ attributeArray.type ], attributeArray.elements, attributeArray.itemSize );
                }
            }
        }

        var stateset = getFieldBackwardCompatible( 'StateSet', node );
        if ( stateset ) {
            var newstateset = new StateSet();
            setStateSet( newstateset, stateset );
            node.stateset = newstateset;
        }

        var matrix = node.matrix || node.Matrix || undefined;
        if ( matrix ) {
            newnode = new MatrixTransform();
            setName( newnode, node );

            MACROUTILS.extend( newnode, node );
            newnode.setMatrix( Matrix.copy( matrix ) );
            node = newnode;
        }

        var projection = node.projection || node.Projection || undefined;
        if ( projection ) {
            newnode = new Projection();
            setName( newnode, node );
            MACROUTILS.extend( newnode, node );
            newnode.setProjectionMatrix( Matrix.copy( projection ) );
            node = newnode;
        }

        // default type
        if ( node.objectType === undefined ) {
            newnode = new Node();
            setName( newnode, node );
            MACROUTILS.extend( newnode, node );
            node = newnode;
        }


        if ( children ) {
            // disable children, it will be processed in the end
            node.children = [];

            for ( var child = 0, childLength = children.length; child < childLength; child++ ) {
                node.addChild( osgDB.parseSceneGraph_deprecated( children[ child ] ) );
            }
        }

        return node;
    };

    return osgDB;
} );
/*global define */

define( [
    'osg/osg',
    'osg/Notify',
    'vendors/Q',
    'osgDB/osgDB',
    'osg/Image',
    'osg/BufferArray',
    'osg/PrimitiveSet',
    'osg/DrawElements'
], function ( osg, Notify, Q, osgDB, Image, BufferArray, PrimitiveSet, DrawElements ) {

    var Input = function ( json, identifier ) {
        this._json = json;
        var map = identifier;
        if ( map === undefined ) {
            map = {};
        }
        this._identifierMap = map;
        this._objectRegistry = {};
        this._progressXHRCallback = undefined;
        this._prefixURL = '';
        this.setImageLoadingOptions( {
            promise: true,
            onload: undefined
        } );
    };


    // keep one instance of image fallback
    if ( !Input.imageFallback ) {
        Input.imageFallback = ( function () {
            var fallback = new window.Image();
            fallback.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P8DwQACgAD/il4QJ8AAAAASUVORK5CYII=';
            return fallback;
        } )();
    }

    Input.prototype = {

        setImageLoadingOptions: function ( options ) {
            this._defaultImageOptions = options;
        },
        getImageLoadingOptions: function () {
            return this._defaultImageOptions;
        },
        setProgressXHRCallback: function ( func ) {
            this._progressXHRCallback = func;
        },

        // used to override the type from pathname
        // typically if you want to create proxy object
        registerObject: function ( fullyqualified_objectname, constructor ) {
            this._objectRegistry[ fullyqualified_objectname ] = constructor;
        },

        getJSON: function () {
            return this._json;
        },

        setJSON: function ( json ) {
            this._json = json;
            return this;
        },

        setPrefixURL: function ( prefix ) {
            this._prefixURL = prefix;
        },
        getPrefixURL: function () {
            return this._prefixURL;
        },
        computeURL: function ( url ) {
            if ( this._prefixURL === undefined ) {
                return url;
            }
            return this._prefixURL + url;
        },
        getObjectWrapper: function ( path ) {
            if ( this._objectRegistry[ path ] !== undefined ) {
                return new( this._objectRegistry[ path ] )();
            }

            // #FIXME hem hem to be fixed
            var scope = window;
            var splittedPath = path.split( '.' );
            for ( var i = 0, l = splittedPath.length; i < l; i++ ) {
                var obj = scope[ splittedPath[ i ] ];
                if ( obj === undefined ) {
                    return undefined;
                }
                scope = obj;
            }
            // create the new obj
            return new( scope )();
        },

        fetchImage: function ( image, url, options, defer ) {
            var checkInlineImage = 'data:image/';
            // crossOrigin does not work for inline data image
            var isInlineImage = ( url.substring( 0, checkInlineImage.length ) === checkInlineImage );
            var img = new window.Image();
            img.onerror = function () {
                Notify.warn( 'warning use white texture as fallback instead of ' + url );
                image.setImage( Input.imageFallback );
                if ( defer ) {
                    defer.resolve( image );
                }
            };

            if ( !isInlineImage && options.crossOrigin ) {
                img.crossOrigin = options.crossOrigin;
            }

            img.onload = function () {

                if ( defer ) {
                    if ( options.onload ) options.onload.call( image );
                    defer.resolve( image );
                } else if ( options.onload )
                    options.onload.call( image );

            };

            image.setURL( url );
            image.setImage( img );

            img.src = url;
            return image;
        },

        readImageURL: function ( url, options ) {
            var self = this;
            // if image is on inline image skip url computation
            if ( url.substr( 0, 10 ) !== 'data:image' ) {
                url = this.computeURL( url );
            }

            if ( options === undefined ) {
                options = this._defaultImageOptions;
            }

            var image = new Image();
            if ( options.promise !== true ) {
                return this.fetchImage( image, url, options );
            }

            defer = Q.defer();
            this.fetchImage( image, url, options, defer );

            return defer.promise;
        },


        readNodeURL: function ( url, options ) {
            url = this.computeURL( url );

            var defer = Q.defer();

            options = options || {};
            var opt = {
                progressXHRCallback: options.progressXHRCallback,
                prefixURL: options.prefixURL,
                defaultImageOptions: options.defaultImageOptions
            };

            // automatic prefix if non specfied
            if ( opt.prefixURL === undefined ) {
                var prefix = this.getPrefixURL();
                var index = url.lastIndexOf( '/' );
                if ( index !== -1 ) {
                    prefix = url.substring( 0, index + 1 );
                }
                opt.prefixURL = prefix;
            }

            var req = new XMLHttpRequest();
            req.open( 'GET', url, true );
            req.onreadystatechange = function ( aEvt ) {
                if ( req.readyState == 4 ) {
                    var child;
                    if ( req.status == 200 ) {
                        Q.when( osgDB.parseSceneGraph( JSON.parse( req.responseText ),
                                opt ),
                            function ( child ) {
                                defer.resolve( child );
                                Notify.log( 'loaded ' + url );

                            } ).fail( function ( error ) {
                            defer.reject( error );
                        } );
                    } else {
                        defer.reject( req.status );
                    }
                }
            };
            req.send( null );
            return defer.promise;
        },

        readBinaryArrayURL: function ( url ) {
            url = this.computeURL( url );

            if ( this._identifierMap[ url ] !== undefined ) {
                return this._identifierMap[ url ];
            }
            var defer = Q.defer();
            var xhr = new XMLHttpRequest();
            xhr.open( 'GET', url, true );
            xhr.responseType = 'arraybuffer';

            if ( this._progressXHRCallback ) {
                xhr.addEventListener( 'progress', this._progressXHRCallback, false );
            }

            xhr.addEventListener( 'error', function () {
                defer.reject();
            }, false );

            var self = this;
            xhr.addEventListener( 'load', function ( oEvent ) {
                var arrayBuffer = xhr.response; // Note: not oReq.responseText
                if ( arrayBuffer ) {
                    // var byteArray = new Uint8Array(arrayBuffer);
                    self._identifierMap[ url ] = arrayBuffer;
                    defer.resolve( arrayBuffer );
                } else {
                    defer.reject();
                }
            }, false );

            xhr.send( null );
            this._identifierMap[ url ] = defer.promise;
            return defer.promise;
        },

        readBufferArray: function () {
            var jsonObj = this.getJSON();

            var uniqueID = jsonObj.UniqueID;
            var osgjsObject;
            if ( uniqueID !== undefined ) {
                osgjsObject = this._identifierMap[ uniqueID ];
                if ( osgjsObject !== undefined ) {
                    return osgjsObject;
                }
            }

            var check = function ( o ) {
                if ( ( o.Elements !== undefined || o.Array !== undefined ) &&
                    o.ItemSize !== undefined &&
                    o.Type ) {
                    return true;
                }
                return false;
            };

            if ( !check( jsonObj ) ) {
                return;
            }

            var obj, defer;

            // inline array
            if ( jsonObj.Elements !== undefined ) {
                obj = new BufferArray( BufferArray[ jsonObj.Type ], jsonObj.Elements, jsonObj.ItemSize );

            } else if ( jsonObj.Array !== undefined ) {

                var buf = new BufferArray( BufferArray[ jsonObj.Type ] );
                buf.setItemSize( jsonObj.ItemSize );

                var vb, type;
                if ( jsonObj.Array.Float32Array !== undefined ) {
                    vb = jsonObj.Array.Float32Array;
                    type = 'Float32Array';
                } else if ( jsonObj.Array.Uint16Array !== undefined ) {
                    vb = jsonObj.Array.Uint16Array;
                    type = 'Uint16Array';
                } else {
                    Notify.warn( 'Typed Array ' + Object.keys( o.Array )[ 0 ] );
                    type = 'Float32Array';
                }

                if ( vb !== undefined ) {
                    if ( vb.File !== undefined ) {
                        var url = vb.File;

                        defer = Q.defer();
                        Q.when( this.readBinaryArrayURL( url ) ).then( function ( array ) {

                            var typedArray;
                            // manage endianness
                            var big_endian;
                            ( function () {
                                var a = new Uint8Array( [ 0x12, 0x34 ] );
                                var b = new Uint16Array( a.buffer );
                                big_endian = ( ( b[ 0 ] ).toString( 16 ) === '1234' );
                            } )();

                            var offset = 0;
                            if ( vb.Offset !== undefined ) {
                                offset = vb.Offset;
                            }

                            var bytesPerElement = osg[ type ].BYTES_PER_ELEMENT;
                            var nbItems = vb.Size;
                            var nbCoords = buf.getItemSize();
                            var totalSizeInBytes = nbItems * bytesPerElement * nbCoords;

                            if ( big_endian ) {
                                Notify.log( 'big endian detected' );
                                var typed_array = osg[ type ];
                                var tmpArray = new typed_array( nbItems * nbCoords );
                                var data = new DataView( array, offset, totalSizeInBytes );
                                var i = 0,
                                    l = tmpArray.length;
                                if ( type === 'Uint16Array' ) {
                                    for ( ; i < l; i++ ) {
                                        tempArray[ i ] = data.getUint16( i * bytesPerElement, true );
                                    }
                                } else if ( type === 'Float32Array' ) {
                                    for ( ; i < l; i++ ) {
                                        tempArray[ i ] = data.getFloat32( i * bytesPerElement, true );
                                    }
                                }
                                typedArray = tempArray;
                                data = null;
                            } else {
                                typedArray = new osg[ type ]( array, offset, nbCoords * nbItems );
                            }
                            a = b = null;

                            buf.setElements( typedArray );
                            defer.resolve( buf );
                        } );
                    } else if ( vb.Elements !== undefined ) {
                        var a = new osg[ type ]( vb.Elements );
                        buf.setElements( a );
                    }
                }
                obj = buf;
            }

            if ( uniqueID !== undefined ) {
                this._identifierMap[ uniqueID ] = obj;
            }

            if ( defer !== undefined ) {
                return defer.promise;
            }
            return obj;
        },

        readUserDataContainer: function () {
            var jsonObj = this.getJSON();
            var osgjsObject;
            var uniqueID = jsonObj.UniqueID;
            if ( uniqueID !== undefined ) {
                osgjsObject = this._identifierMap[ uniqueID ];
                if ( osgjsObject !== undefined ) {
                    return osgjsObject.Values;
                }
            }

            this._identifierMap[ uniqueID ] = jsonObj;
            return jsonObj.Values;
        },

        readPrimitiveSet: function () {
            var jsonObj = this.getJSON();
            var uniqueID;
            var osgjsObject;

            var obj;
            var defer;
            var drawElementPrimitive = jsonObj.DrawElementUShort || jsonObj.DrawElementUByte || jsonObj.DrawElementUInt || jsonObj.DrawElementsUShort || jsonObj.DrawElementsUByte || jsonObj.DrawElementsUInt || undefined;
            if ( drawElementPrimitive ) {

                uniqueID = drawElementPrimitive.UniqueID;
                if ( uniqueID !== undefined ) {
                    osgjsObject = this._identifierMap[ uniqueID ];
                    if ( osgjsObject !== undefined ) {
                        return osgjsObject;
                    }
                }

                defer = Q.defer();
                var jsonArray = drawElementPrimitive.Indices;
                var prevJson = jsonObj;

                mode = drawElementPrimitive.Mode;
                if ( !mode ) {
                    mode = PrimitiveSet.TRIANGLES;
                } else {
                    mode = PrimitiveSet[ mode ];
                }
                obj = new DrawElements( mode );

                this.setJSON( jsonArray );
                Q.when( this.readBufferArray() ).then(
                    function ( array ) {
                        obj.setIndices( array );
                        defer.resolve( obj );
                    } );
                this.setJSON( prevJson );
            }

            var drawArrayPrimitive = jsonObj.DrawArray || jsonObj.DrawArrays;
            if ( drawArrayPrimitive ) {

                uniqueID = drawArrayPrimitive.UniqueID;
                if ( uniqueID !== undefined ) {
                    osgjsObject = this._identifierMap[ uniqueID ];
                    if ( osgjsObject !== undefined ) {
                        return osgjsObject;
                    }
                }

                mode = drawArrayPrimitive.Mode || drawArrayPrimitive.mode;
                first = drawArrayPrimitive.First !== undefined ? drawArrayPrimitive.First : drawArrayPrimitive.first;
                count = drawArrayPrimitive.Count !== undefined ? drawArrayPrimitive.Count : drawArrayPrimitive.count;
                var drawArray = new DrawArrays( PrimitiveSet[ mode ], first, count );
                obj = drawArray;
            }

            var drawArrayLengthsPrimitive = jsonObj.DrawArrayLengths || undefined;
            if ( drawArrayLengthsPrimitive ) {

                uniqueID = drawArrayLengthsPrimitive.UniqueID;
                if ( uniqueID !== undefined ) {
                    osgjsObject = this._identifierMap[ uniqueID ];
                    if ( osgjsObject !== undefined ) {
                        return osgjsObject;
                    }
                }

                mode = drawArrayLengthsPrimitive.Mode;
                first = drawArrayLengthsPrimitive.First;
                var array = drawArrayLengthsPrimitive.ArrayLengths;
                var drawArrayLengths = new DrawArrayLengths( PrimitiveSet[ mode ], first, array );
                obj = drawArrayLengths;
            }

            if ( uniqueID !== undefined ) {
                this._identifierMap[ uniqueID ] = obj;
            }

            if ( defer ) {
                return defer.promise;
            }
            return obj;
        },


        readObject: function () {

            var jsonObj = this.getJSON();
            var prop = Object.keys( jsonObj )[ 0 ];
            if ( !prop ) {
                Notify.warn( 'can\'t find property for object ' + jsonObj );
                return undefined;
            }

            var uniqueID = jsonObj[ prop ].UniqueID;
            var osgjsObject;
            if ( uniqueID !== undefined ) {
                osgjsObject = this._identifierMap[ uniqueID ];
                if ( osgjsObject !== undefined ) {
                    return osgjsObject;
                }
            }

            var obj = this.getObjectWrapper( prop );
            if ( !obj ) {
                Notify.warn( 'can\'t instanciate object ' + prop );
                return undefined;
            }

            var scope = osgDB.ObjectWrapper.serializers;
            var splittedPath = prop.split( '.' );
            for ( var i = 0, l = splittedPath.length; i < l; i++ ) {
                var reader = scope[ splittedPath[ i ] ];
                if ( reader === undefined ) {
                    Notify.warn( 'can\'t find function to read object ' + prop + ' - undefined' );
                    return undefined;
                }
                scope = reader;
            }

            var promise = scope( this.setJSON( jsonObj[ prop ] ), obj );

            if ( uniqueID !== undefined ) {
                this._identifierMap[ uniqueID ] = obj;
                obj._uniqueID = uniqueID;
            }
            return promise;
        }
    };

    return Input;
} );
/*global define */

define( [
    'osgViewer/View',
    'osgViewer/Viewer'
], function ( View, Viewer ) {

    /** -*- compile-command: "jslint-cli osgViewer.js" -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    var osgViewer = {};

    osgViewer.View = View;
    osgViewer.Viewer = Viewer;

    return osgViewer;
} );
/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimationFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

WebGLUtils = function() {

    /**
     * Creates the HTLM for a failure message
     * @param {string} canvasContainerId id of container of th
     *        canvas.
     * @return {string} The html.
     */
    var makeFailHTML = function(msg) {
        return '' +
            '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
        // return '' +
        //   '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
        //   '<td align="center">' +
        //   '<div style="display: table-cell; vertical-align: middle;">' +
        //   '<div style="">' + msg + '</div>' +
        //   '</div>' +
        //   '</td></tr></table>';
    };

    /**
     * Mesasge for getting a webgl browser
     * @type {string}
     */
    var GET_A_WEBGL_BROWSER = '' +
        'This page requires a browser that supports WebGL.<br/>' +
        '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

    /**
     * Mesasge for need better hardware
     * @type {string}
     */
    var OTHER_PROBLEM = '' +
        "It doesn't appear your computer can support WebGL.<br/>" +
        '<a href="http://get.webgl.org">Click here for more information.</a>';

    /**
     * Creates a webgl context. If creation fails it will
     * change the contents of the container of the <canvas>
     * tag to an error message with the correct links for WebGL.
     * @return {WebGLRenderingContext} The created context.
     */
    var setupWebGL = function(
        /** Element */ canvas, 
        /** WebGLContextCreationAttirbutes */ opt_attribs, 
        /** function:(msg) */ opt_onError) {
        function handleCreationError(msg) {
            var container = document.getElementsByTagName("body")[0];
            //var container = canvas.parentNode;
            if (container) {
                var str = window.WebGLRenderingContext ?
                    OTHER_PROBLEM :
                    GET_A_WEBGL_BROWSER;
                if (msg) {
                    str += "<br/><br/>Status: " + msg;
                }
                container.innerHTML = makeFailHTML(str);
            }
        }

        opt_onError = opt_onError || handleCreationError;

        if (canvas.addEventListener) {
            canvas.addEventListener("webglcontextcreationerror", function(event) {
                opt_onError(event.statusMessage);
            }, false);
        }
        var context = create3DContext(canvas, opt_attribs);
        if (!context) {
            if (!window.WebGLRenderingContext) {
                opt_onError("");
            } else {
                opt_onError("");
            }
        }

        return context;
    };

    /**
     * Creates a webgl context.
     * @param {!Canvas} canvas The canvas tag to get context
     *     from. If one is not passed in one will be created.
     * @return {!WebGLContext} The created context.
     */
    var create3DContext = function(canvas, opt_attribs) {
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        var context = null;
        for (var ii = 0; ii < names.length; ++ii) {
            try {
                context = canvas.getContext(names[ii], opt_attribs);
            } catch(e) {}
            if (context) {
                break;
            }
        }
        return context;
    };

    return {
        create3DContext: create3DContext,
        setupWebGL: setupWebGL
    };
}();

/**
 * Provides requestAnimationFrame in a cross browser
 * way.
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000/60);
            };
    })();
}

if (!window.cancelRequestAnimFrame) {
    window.cancelRequestAnimFrame = ( function() {
        return window.cancelAnimationFrame          ||
            window.webkitCancelRequestAnimationFrame    ||
            window.mozCancelRequestAnimationFrame       ||
            window.oCancelRequestAnimationFrame     ||
            window.msCancelRequestAnimationFrame        ||
            clearTimeout;
    } )();
}


if(!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

/** Obtain a stacktrace from the current stack http://eriwen.com/javascript/js-stack-trace/
*/
function getStackTrace(err) {
    var callstack = [];
    var originalArgs = arguments;
    try {
        if(arguments.length == 1) {
            throw err;
        } else {
            throw new Error();
        }
    } catch(err) {
        if(err.stack) { //Firefox and Chrome
            callstack = (err.stack + '\n').replace(/^\S[^\(]+?[\n$]/gm, '').
            replace(/^\s+(at eval )?at\s+/gm, '').
            replace(/^([^\(]+?)([\n$])/gm, '{anonymous}()@$1$2').
            replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}()@$1').split('\n');
            // Remove call to this function
            callstack.shift();

        }
    }
    // Remove empty entries
    for(var i = 0; i < callstack.length; ++i) {
        if(callstack[i] === '') {
            callstack.splice(i, 1);
            --i;
        }
    }

    return callstack;
}

//Copyright (c) 2009 The Chromium Authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that can be
//found in the LICENSE file.

// Various functions for helping debug WebGL apps.

WebGLDebugUtils = function() {

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function(msg) {
  if (window.console && window.console.log) {
    window.console.log(msg);
  }
};

/**
 * Which arguements are enums.
 * @type {!Object.<number, string>}
 */
var glValidEnumContexts = {

  // Generic setters and getters

  'enable': { 0:true },
  'disable': { 0:true },
  'getParameter': { 0:true },

  // Rendering

  'drawArrays': { 0:true },
  'drawElements': { 0:true, 2:true },

  // Shaders

  'createShader': { 0:true },
  'getShaderParameter': { 1:true },
  'getProgramParameter': { 1:true },

  // Vertex attributes

  'getVertexAttrib': { 1:true },
  'vertexAttribPointer': { 2:true },

  // Textures

  'bindTexture': { 0:true },
  'activeTexture': { 0:true },
  'getTexParameter': { 0:true, 1:true },
  'texParameterf': { 0:true, 1:true },
  'texParameteri': { 0:true, 1:true, 2:true },
  'texImage2D': { 0:true, 2:true, 6:true, 7:true },
  'texSubImage2D': { 0:true, 6:true, 7:true },
  'copyTexImage2D': { 0:true, 2:true },
  'copyTexSubImage2D': { 0:true },
  'generateMipmap': { 0:true },

  // Buffer objects

  'bindBuffer': { 0:true },
  'bufferData': { 0:true, 2:true },
  'bufferSubData': { 0:true },
  'getBufferParameter': { 0:true, 1:true },

  // Renderbuffers and framebuffers

  'pixelStorei': { 0:true, 1:true },
  'readPixels': { 4:true, 5:true },
  'bindRenderbuffer': { 0:true },
  'bindFramebuffer': { 0:true },
  'checkFramebufferStatus': { 0:true },
  'framebufferRenderbuffer': { 0:true, 1:true, 2:true },
  'framebufferTexture2D': { 0:true, 1:true, 2:true },
  'getFramebufferAttachmentParameter': { 0:true, 1:true, 2:true },
  'getRenderbufferParameter': { 0:true, 1:true },
  'renderbufferStorage': { 0:true, 1:true },

  // Frame buffer operations (clear, blend, depth test, stencil)

  'clear': { 0:true },
  'depthFunc': { 0:true },
  'blendFunc': { 0:true, 1:true },
  'blendFuncSeparate': { 0:true, 1:true, 2:true, 3:true },
  'blendEquation': { 0:true },
  'blendEquationSeparate': { 0:true, 1:true },
  'stencilFunc': { 0:true },
  'stencilFuncSeparate': { 0:true, 1:true },
  'stencilMaskSeparate': { 0:true },
  'stencilOp': { 0:true, 1:true, 2:true },
  'stencilOpSeparate': { 0:true, 1:true, 2:true, 3:true },

  // Culling

  'cullFace': { 0:true },
  'frontFace': { 0:true }
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums === null) {
    glEnums = { };
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'number') {
        glEnums[ctx[propertyName]] = propertyName;
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums === null) {
    throw 'WebGLDebugUtils.init(ctx) not called';
  }
}

/**
 * Returns true or false if value matches any WebGL enum
 * @param {*} value Value to check if it might be an enum.
 * @return {boolean} True if value matches one of the WebGL defined enums
 */
function mightBeEnum(value) {
  checkInit();
  return (glEnums[value] !== undefined);
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return (name !== undefined) ? name :
      ("*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")");
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    if (funcInfo[argumentIndex]) {
      return glEnumToString(value);
    }
  }
  return value.toString();
}

function makePropertyWrapper(wrapper, original, propertyName) {
  //log("wrap prop: " + propertyName);
  wrapper.__defineGetter__(propertyName, function() {
    return original[propertyName];
  });
  // TODO(gmane): this needs to handle properties that take more than
  // one value?
  wrapper.__defineSetter__(propertyName, function(value) {
    //log("set: " + propertyName);
    original[propertyName] = value;
  });
}

// Makes a function that calls a function on another object.
function makeFunctionWrapper(original, functionName) {
  //log("wrap fn: " + functionName);
  var f = original[functionName];
  return function() {
    //log("call: " + functionName);
    var result = f.apply(original, arguments);
    return result;
  };
}

/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 */
function makeDebugContext(ctx, opt_onErrorFunc) {
  init(ctx);
  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        for (var ii = 0; ii < args.length; ++ii) {
          argStr += ((ii === 0) ? '' : ', ') +
              glFunctionArgToString(functionName, ii, args[ii]);
        }
        log("WebGL error "+ glEnumToString(err) + " in "+ functionName +
            "(" + argStr + ")");
      };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = { };

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function() {
      var result = ctx[functionName].apply(ctx, arguments);
      var err = ctx.getError();
      if (err !== 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
     } else {
       makePropertyWrapper(wrapper, ctx, propertyName);
     }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function() {
    for (var err in glErrorShadow) {
      if (glErrorShadow[err]) {
        glErrorShadow[err] = false;
        return err;
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
}

    function resetToInitialState(ctx) {
        var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
        var tmp = ctx.createBuffer();
        ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
        var ii;
        for (ii = 0; ii < numAttribs; ++ii) {
            ctx.disableVertexAttribArray(ii);
            ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
            ctx.vertexAttrib1f(ii, 0);
        }
        ctx.deleteBuffer(tmp);

        var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
        for (ii = 0; ii < numTextureUnits; ++ii) {
            ctx.activeTexture(ctx.TEXTURE0 + ii);
            ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
            ctx.bindTexture(ctx.TEXTURE_2D, null);
        }

        ctx.activeTexture(ctx.TEXTURE0);
        ctx.useProgram(null);
        ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
        ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
        ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
        ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
        ctx.disable(ctx.BLEND);
        ctx.disable(ctx.CULL_FACE);
        ctx.disable(ctx.DEPTH_TEST);
        ctx.disable(ctx.DITHER);
        ctx.disable(ctx.SCISSOR_TEST);
        ctx.blendColor(0, 0, 0, 0);
        ctx.blendEquation(ctx.FUNC_ADD);
        ctx.blendFunc(ctx.ONE, ctx.ZERO);
        ctx.clearColor(0, 0, 0, 0);
        ctx.clearDepth(1);
        ctx.clearStencil(-1);
        ctx.colorMask(true, true, true, true);
        ctx.cullFace(ctx.BACK);
        ctx.depthFunc(ctx.LESS);
        ctx.depthMask(true);
        ctx.depthRange(0, 1);
        ctx.frontFace(ctx.CCW);
        ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
        ctx.lineWidth(1);
        ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
        ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
        ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
        ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        // TODO: Delete this IF.
        if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
            ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
        }
        ctx.polygonOffset(0, 0);
        ctx.sampleCoverage(1, false);
        ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
        ctx.stencilMask(0xFFFFFFFF);
        ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
        ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

        // TODO: This should NOT be needed but Firefox fails with 'hint'
        while (ctx.getError()) {}
    }

    function makeLostContextSimulatingCanvas(canvas) {
        var unwrappedContext_;
        //var wrappedContext_;
        var onLost_ = [];
        var onRestored_ = [];
        var wrappedContext_ = {};
        var contextId_ = 1;
        var contextLost_ = false;
        var resourceId_ = 0;
        var resourceDb_ = [];
        var numCallsToLoseContext_ = 0;
        var numCalls_ = 0;
        var canRestore_ = false;
        var restoreTimeout_ = 0;

        // Holds booleans for each GL error so can simulate errors.
        var glErrorShadow_ = { };

        canvas.getContext = function(f) {
            return function() {
                var ctx = f.apply(canvas, arguments);
                // Did we get a context and is it a WebGL context?
                if (ctx instanceof WebGLRenderingContext) {
                    if (ctx != unwrappedContext_) {
                        if (unwrappedContext_) {
                            throw "got different context";
                        }
                        unwrappedContext_ = ctx;
                        wrappedContext_ = makeLostContextSimulatingContext(unwrappedContext_);
                    }
                    return wrappedContext_;
                }
                return ctx;
            };
        }(canvas.getContext);

        function wrapEvent(listener) {
            if (typeof(listener) == "function") {
                return listener;
            } else {
                return function(info) {
                    listener.handleEvent(info);
                };
            }
        }

        var addOnContextLostListener = function(listener) {
            onLost_.push(wrapEvent(listener));
        };

        var addOnContextRestoredListener = function(listener) {
            onRestored_.push(wrapEvent(listener));
        };


        function wrapAddEventListener(canvas) {
            var f = canvas.addEventListener;
            canvas.addEventListener = function(type, listener, bubble) {
                switch (type) {
                case 'webglcontextlost':
                    addOnContextLostListener(listener);
                    break;
                case 'webglcontextrestored':
                    addOnContextRestoredListener(listener);
                    break;
                default:
                    f.apply(canvas, arguments);
                }
            };
        }

        wrapAddEventListener(canvas);

        canvas.loseContext = function() {
            if (!contextLost_) {
                contextLost_ = true;
                numCallsToLoseContext_ = 0;
                ++contextId_;
                while (unwrappedContext_.getError()) {}
                clearErrors();
                glErrorShadow_[unwrappedContext_.CONTEXT_LOST_WEBGL] = true;
                var event = makeWebGLContextEvent("context lost");
                var callbacks = onLost_.slice();
                setTimeout(function() {
                    //log("numCallbacks:" + callbacks.length);
                    for (var ii = 0; ii < callbacks.length; ++ii) {
                        //log("calling callback:" + ii);
                        callbacks[ii](event);
                    }
                    if (restoreTimeout_ >= 0) {
                        setTimeout(function() {
                            canvas.restoreContext();
                        }, restoreTimeout_);
                    }
                }, 0);
            }
        };

        canvas.restoreContext = function() {
            if (contextLost_) {
                if (onRestored_.length) {
                    setTimeout(function() {
                        if (!canRestore_) {
                            throw "can not restore. webglcontestlost listener did not call event.preventDefault";
                        }
                        freeResources();
                        resetToInitialState(unwrappedContext_);
                        contextLost_ = false;
                        numCalls_ = 0;
                        canRestore_ = false;
                        var callbacks = onRestored_.slice();
                        var event = makeWebGLContextEvent("context restored");
                        for (var ii = 0; ii < callbacks.length; ++ii) {
                            callbacks[ii](event);
                        }
                    }, 0);
                }
            }
        };

        canvas.loseContextInNCalls = function(numCalls) {
            if (contextLost_) {
                throw "You can not ask a lost contet to be lost";
            }
            numCallsToLoseContext_ = numCalls_ + numCalls;
        };

        canvas.getNumCalls = function() {
            return numCalls_;
        };

        canvas.setRestoreTimeout = function(timeout) {
            restoreTimeout_ = timeout;
        };

        function isWebGLObject(obj) {
            //return false;
            return (obj instanceof WebGLBuffer ||
                    obj instanceof WebGLFramebuffer ||
                    obj instanceof WebGLProgram ||
                    obj instanceof WebGLRenderbuffer ||
                    obj instanceof WebGLShader ||
                    obj instanceof WebGLTexture);
        }

        function checkResources(args) {
            for (var ii = 0; ii < args.length; ++ii) {
                var arg = args[ii];
                if (isWebGLObject(arg)) {
                    return arg.__webglDebugContextLostId__ == contextId_;
                }
            }
            return true;
        }

        function clearErrors() {
            var k = Object.keys(glErrorShadow_);
            for (var ii = 0; ii < k.length; ++ii) {
                delete glErrorShadow_[k];
            }
        }

        function loseContextIfTime() {
            ++numCalls_;
            if (!contextLost_) {
                if (numCallsToLoseContext_ == numCalls_) {
                    canvas.loseContext();
                }
            }
        }

        // Makes a function that simulates WebGL when out of context.
        function makeLostContextFunctionWrapper(ctx, functionName) {
            var f = ctx[functionName];
            return function() {
                // log("calling:" + functionName);
                // Only call the functions if the context is not lost.
                loseContextIfTime();
                if (!contextLost_) {
                    //if (!checkResources(arguments)) {
                    //  glErrorShadow_[wrappedContext_.INVALID_OPERATION] = true;
                    //  return;
                    //}
                    var result = f.apply(ctx, arguments);
                    return result;
                }
            };
        }

        function freeResources() {
            for (var ii = 0; ii < resourceDb_.length; ++ii) {
                var resource = resourceDb_[ii];
                if (resource instanceof WebGLBuffer) {
                    unwrappedContext_.deleteBuffer(resource);
                } else if (resource instanceof WebGLFramebuffer) {
                    unwrappedContext_.deleteFramebuffer(resource);
                } else if (resource instanceof WebGLProgram) {
                    unwrappedContext_.deleteProgram(resource);
                } else if (resource instanceof WebGLRenderbuffer) {
                    unwrappedContext_.deleteRenderbuffer(resource);
                } else if (resource instanceof WebGLShader) {
                    unwrappedContext_.deleteShader(resource);
                } else if (resource instanceof WebGLTexture) {
                    unwrappedContext_.deleteTexture(resource);
                }
            }
        }

        function makeWebGLContextEvent(statusMessage) {
            return {
                statusMessage: statusMessage,
                preventDefault: function() {
                    canRestore_ = true;
                }
            };
        }


        function makeLostContextSimulatingContext (ctx) {
            // copy all functions and properties to wrapper
            for (var propertyName in ctx) {
                if (typeof ctx[propertyName] == 'function') {
                    wrappedContext_[propertyName] = makeLostContextFunctionWrapper(
                        ctx, propertyName);
                } else {
                    makePropertyWrapper(wrappedContext_, ctx, propertyName);
                }
            }

            // Wrap a few functions specially.
            wrappedContext_.getError = function() {
                loseContextIfTime();
                var err;
                if (!contextLost_) {
                    while (err = unwrappedContext_.getError()) {
                        glErrorShadow_[err] = true;
                    }
                }
                for (err in glErrorShadow_) {
                    if (glErrorShadow_[err]) {
                        delete glErrorShadow_[err];
                        return err;
                    }
                }
                return wrappedContext_.NO_ERROR;
            };

            var creationFunctions = [
                "createBuffer",
                "createFramebuffer",
                "createProgram",
                "createRenderbuffer",
                "createShader",
                "createTexture"
            ];
            var functionName, ii;
            for ( ii = 0; ii < creationFunctions.length; ++ii) {
                functionName = creationFunctions[ii];
                wrappedContext_[functionName] = function(f) {
                    return function() {
                        loseContextIfTime();
                        if (contextLost_) {
                            return null;
                        }
                        var obj = f.apply(ctx, arguments);
                        obj.__webglDebugContextLostId__ = contextId_;
                        resourceDb_.push(obj);
                        return obj;
                    };
                }(ctx[functionName]);
            }

            var functionsThatShouldReturnNull = [
                "getActiveAttrib",
                "getActiveUniform",
                "getBufferParameter",
                "getContextAttributes",
                "getAttachedShaders",
                "getFramebufferAttachmentParameter",
                "getParameter",
                "getProgramParameter",
                "getProgramInfoLog",
                "getRenderbufferParameter",
                "getShaderParameter",
                "getShaderInfoLog",
                "getShaderSource",
                "getTexParameter",
                "getUniform",
                "getUniformLocation",
                "getVertexAttrib"
            ];
            for (ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
                functionName = functionsThatShouldReturnNull[ii];
                wrappedContext_[functionName] = function(f) {
                    return function() {
                        loseContextIfTime();
                        if (contextLost_) {
                            return null;
                        }
                        return f.apply(ctx, arguments);
                    };
                }(wrappedContext_[functionName]);
            }

            var isFunctions = [
                "isBuffer",
                "isEnabled",
                "isFramebuffer",
                "isProgram",
                "isRenderbuffer",
                "isShader",
                "isTexture"
            ];
            for (ii = 0; ii < isFunctions.length; ++ii) {
                functionName = isFunctions[ii];
                wrappedContext_[functionName] = function(f) {
                    return function() {
                        loseContextIfTime();
                        if (contextLost_) {
                            return false;
                        }
                        return f.apply(ctx, arguments);
                    };
                }(wrappedContext_[functionName]);
            }

            wrappedContext_.checkFramebufferStatus = function(f) {
                return function() {
                    loseContextIfTime();
                    if (contextLost_) {
                        return wrappedContext_.FRAMEBUFFER_UNSUPPORTED;
                    }
                    return f.apply(ctx, arguments);
                };
            }(wrappedContext_.checkFramebufferStatus);

            wrappedContext_.getAttribLocation = function(f) {
                return function() {
                    loseContextIfTime();
                    if (contextLost_) {
                        return -1;
                    }
                    return f.apply(ctx, arguments);
                };
            }(wrappedContext_.getAttribLocation);

            wrappedContext_.getVertexAttribOffset = function(f) {
                return function() {
                    loseContextIfTime();
                    if (contextLost_) {
                        return 0;
                    }
                    return f.apply(ctx, arguments);
                };
            }(wrappedContext_.getVertexAttribOffset);

            wrappedContext_.isContextLost = function() {
                return contextLost_;
            };

            return wrappedContext_;
        }

       // TODO: find why this is there ?
       return canvas;
    }

return {
    /**
     * Initializes this module. Safe to call more than once.
     * @param {!WebGLRenderingContext} ctx A WebGL context. If
    }
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  'init': init,

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  'mightBeEnum': mightBeEnum,

  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  'glEnumToString': glEnumToString,

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  'glFunctionArgToString': glFunctionArgToString,

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" +
   *            funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   */
  'makeDebugContext': makeDebugContext,

  /**
   * Given a canvas element returns a wrapped canvas element that will
   * simulate lost context. The canvas returned adds the following functions.
   *
   * loseContext:
   *   simulates a lost context event.
   *
   * restoreContext:
   *   simulates the context being restored.
   *
   * lostContextInNCalls:
   *   loses the context after N gl calls.
   *
   * getNumCalls:
   *   tells you how many gl calls there have been so far.
   *
   * setRestoreTimeout:
   *   sets the number of milliseconds until the context is restored
   *   after it has been lost. Defaults to 0. Pass -1 to prevent
   *   automatic restoring.
   *
   * @param {!Canvas} canvas The canvas element to wrap.
   */
  'makeLostContextSimulatingCanvas': makeLostContextSimulatingCanvas,

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} ctx The webgl context to
   *     reset.
   */
  'resetToInitialState': resetToInitialState
};

}();

/** -*- compile-command: "jslint-cli stats.js" -*-
 *
 *  Copyright (C) 2010 Cedric Pinson
 *
 *                  GNU LESSER GENERAL PUBLIC LICENSE
 *                      Version 3, 29 June 2007
 *
 * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
 * Everyone is permitted to copy and distribute verbatim copies
 * of this license document, but changing it is not allowed.
 *
 * This version of the GNU Lesser General Public License incorporates
 * the terms and conditions of version 3 of the GNU General Public
 * License
 *
 * Authors:
 *  Cedric Pinson <cedric.pinson@plopbyte.net>
 *
 */

var Stats = {};

Stats.Stats = function(canvas, textCanvas) {
    this.layers = [];
    this.last_update = undefined;
    this.canvas = canvas;
    this.text_canvas = textCanvas;
    this.numberUpdate = 0;
};

Stats.Stats.prototype = {
    addLayer: function(color, maxVal, getter, texter) {
        if(color === undefined) {
            color = "rgb(255,255,255)";
        }
        this.layers.push({
            previous: 0,
            color: color,
            getValue: getter,
            getText: texter,
            average: 0,
            max: maxVal
        });
    },

    update: function() {

        var delta, i, l, layer, value, c, ctx, height, myImageData, t = osg.performance.now();
        if(this.last_update === undefined) {
            this.last_update = t;
        }
        this.numberUpdate++;
        for(i = 0, l = this.layers.length; i < l; i++) {
            layer = this.layers[i];
            value = layer.getValue(t);
            layer.average += value;
        }
        //i = 2.0 * 60.0 / 1000.0;
        i = 0.12; //4.0 * 60.0 / 1000.0;
        delta = (t - this.last_update) * i;
        if(delta >= 1.0) {

            t -= (delta - Math.floor(delta)) / i;
            delta = Math.floor(delta);

            c = this.canvas;
            ctx = c.getContext("2d");

            myImageData = ctx.getImageData(delta, 0, c.width - delta, c.height);
            ctx.putImageData(myImageData, 0, 0);
            ctx.clearRect(c.width - delta, 0, delta, c.height);

            for(i = 0, l = this.layers.length; i < l; i++) {
                layer = this.layers[i];
                value = layer.getValue(t);
                value *= c.height / layer.max;
                if(value > c.height) value = c.height;
                ctx.lineWidth = 1.0;
                ctx.strokeStyle = layer.color;
                ctx.beginPath();
                ctx.moveTo(c.width - delta, c.height - layer.previous);
                ctx.lineTo(c.width, c.height - value);
                ctx.stroke();
                layer.previous = value;
            }
        }

        if(this.numberUpdate % 60 === 0) {
            c = this.text_canvas;
            ctx = c.getContext("2d");
            ctx.font = "14px Sans";
            height = 17;
            delta = height;
            ctx.clearRect(0, 0, c.width, c.height);
            for(i = 0, l = this.layers.length; i < l; i++) {
                layer = this.layers[i];
                value = layer.getText(layer.average / this.numberUpdate);
                layer.average = 0;
                ctx.fillStyle = layer.color;
                ctx.fillText(value, 0, delta);
                delta += height;
            }
            this.numberUpdate = 0;
        }
        this.last_update = t;
    }
};

/*global define */

define( [
    'osg/Camera',
    'osg/Node',
    'osg/FrameStamp',
    'osg/Material',
    'osg/Depth',
    'osg/BlendFunc',
    'osg/CullFace',
    'osg/Viewport',
    'osg/Matrix',
    'osg/Light'
], function ( Camera, Node, FrameStamp, Material, Depth, BlendFunc, CullFace, Viewport, Matrix, Light ) {

    /** -*- compile-command: "jslint-cli View.js" -*- */
    var View = function () {
        this._graphicContext = undefined;
        this._camera = new Camera();
        this._scene = new Node();
        this._sceneData = undefined;
        this._frameStamp = new FrameStamp();
        this._lightingMode = undefined;
        this._manipulator = undefined;

        this.setLightingMode( View.LightingMode.HEADLIGHT );

        this._scene.getOrCreateStateSet().setAttributeAndMode( new Material() );
        this._scene.getOrCreateStateSet().setAttributeAndMode( new Depth() );
        this._scene.getOrCreateStateSet().setAttributeAndMode( new BlendFunc() );
        this._scene.getOrCreateStateSet().setAttributeAndMode( new CullFace() );
    };

    View.LightingMode = {
        NO_LIGHT: 0,
        HEADLIGHT: 1,
        SKY_LIGHT: 2
    };

    View.prototype = {
        setGraphicContext: function ( gc ) {
            this._graphicContext = gc;
        },
        getGraphicContext: function () {
            return this._graphicContext;
        },
        setUpView: function ( canvas ) {
            var width = canvas.width !== 0 ? canvas.width : 800;
            var height = canvas.height !== 0 ? canvas.height : 600;
            var ratio = width / height;
            this._camera.setViewport( new Viewport( 0, 0, width, height ) );
            Matrix.makeLookAt( [ 0, 0, -10 ], [ 0, 0, 0 ], [ 0, 1, 0 ], this._camera.getViewMatrix() );
            Matrix.makePerspective( 55, ratio, 1.0, 1000.0, this._camera.getProjectionMatrix() );
        },
        computeIntersections: function ( x, y, traversalMask ) {
            if ( traversalMask === undefined ) {
                traversalMask = ~0;
            }

            var iv = new IntersectVisitor();
            iv.setTraversalMask( traversalMask );
            iv.addLineSegment( [ x, y, 0.0 ], [ x, y, 1.0 ] );
            iv.pushCamera( this._camera );
            this._sceneData.accept( iv );
            return iv.hits;
        },

        setFrameStamp: function ( frameStamp ) {
            this._frameStamp = frameStamp;
        },
        getFrameStamp: function () {
            return this._frameStamp;
        },
        setCamera: function ( camera ) {
            this._camera = camera;
        },
        getCamera: function () {
            return this._camera;
        },

        setSceneData: function ( node ) {
            this._scene.removeChildren();
            this._scene.addChild( node );
            this._sceneData = node;
        },
        getSceneData: function () {
            return this._sceneData;
        },
        getScene: function () {
            return this._scene;
        },

        getManipulator: function () {
            return this._manipulator;
        },
        setManipulator: function ( manipulator ) {
            this._manipulator = manipulator;
        },

        getLight: function () {
            return this._light;
        },
        setLight: function ( light ) {
            this._light = light;
            if ( this._lightingMode !== View.LightingMode.NO_LIGHT ) {
                this._scene.getOrCreateStateSet().setAttributeAndMode( this._light );
            }
        },
        getLightingMode: function () {
            return this._lightingMode;
        },
        setLightingMode: function ( lightingMode ) {
            if ( this._lightingMode !== lightingMode ) {
                this._lightingMode = lightingMode;
                if ( this._lightingMode !== View.LightingMode.NO_LIGHT ) {
                    if ( !this._light ) {
                        this._light = new Light();
                        this._light.setAmbient( [ 0.2, 0.2, 0.2, 1.0 ] );
                        this._light.setDiffuse( [ 0.8, 0.8, 0.8, 1.0 ] );
                        this._light.setSpecular( [ 0.5, 0.5, 0.5, 1.0 ] );
                    }
                } else {
                    this._light = undefined;
                }
            }
        }

    };

    return View;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'osg/UpdateVisitor',
    'osg/CullVisitor',
    'osgUtil/osgUtil',
    'osgViewer/View',
    'osg/RenderStage',
    'osg/StateGraph',
    'osg/Matrix',
    'osg/State',
    'osgGA/OrbitManipulator',
    'osgViewer/eventProxy/EventProxy'
], function ( Notify, MACROUTILS, UpdateVisitor, CullVisitor, osgUtil, View, RenderStage, StateGraph, Matrix, State, OrbitManipulator, EventProxy ) {

    /** -*- compile-command: 'jslint-cli Viewer.js' -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    ( function () {

        // install an html console logger for mobile
        var optionsURL = function () {
            var vars = [],
                hash;
            var hashes = window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ).split( '&' );
            for ( var i = 0; i < hashes.length; i++ ) {
                hash = hashes[ i ].split( '=' );
                var element = hash[ 0 ].toLowerCase();
                vars.push( element );
                var result = hash[ 1 ];
                if ( result === undefined ) {
                    result = '1';
                }
                vars[ element ] = result.toLowerCase();

            }
            return vars;
        };

        var options = optionsURL();

        if ( options.log !== undefined ) {
            var level = options.log.toLowerCase();

            switch ( level ) {
            case 'debug':
                Notify.setNotifyLevel( Notify.DEBUG );
                break;
            case 'info':
                Notify.setNotifyLevel( Notify.INFO );
                break;
            case 'notice':
                Notify.setNotifyLevel( Notify.NOTICE );
                break;
            case 'warn':
                Notify.setNotifyLevel( Notify.WARN );
                break;
            case 'error':
                Notify.setNotifyLevel( Notify.ERROR );
                break;
            case 'html':
                ( function () {
                    var logContent = [];
                    var divLogger = document.createElement( 'div' );
                    var codeElement = document.createElement( 'pre' );
                    document.addEventListener( 'DOMContentLoaded', function () {
                        document.body.appendChild( divLogger );
                        divLogger.appendChild( codeElement );
                    } );
                    var logFunc = function ( str ) {
                        logContent.unshift( str );
                        codeElement.innerHTML = logContent.join( '\n' );
                    };
                    divLogger.style.overflow = 'hidden';
                    divLogger.style.position = 'absolute';
                    divLogger.style.zIndex = '10000';
                    divLogger.style.height = '100%';
                    divLogger.style.maxWidth = '600px';
                    codeElement.style.overflow = 'scroll';
                    codeElement.style.width = '105%';
                    codeElement.style.height = '100%';
                    codeElement.style.fontSize = '10px';

                    [ 'log', 'error', 'warn', 'info', 'debug' ].forEach( function ( value ) {
                        window.console[ value ] = logFunc;
                    } );
                } )();
                break;
            }
        }

    } )();

    Viewer = function ( canvas, options, error ) {
        View.call( this );

        if ( options === undefined ) {
            options = {
                antialias: true
            };
        }
        this._options = options;

        // #FIXME uncomment  + change namespace ??
        // if ( osg.SimulateWebGLLostContext ) {
        //     canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas( canvas );
        //     canvas.loseContextInNCalls( osg.SimulateWebGLLostContext );
        // }

        gl = WebGLUtils.setupWebGL( canvas, options, error );
        var self = this;
        canvas.addEventListener( 'webglcontextlost', function ( event ) {
            self.contextLost();
            event.preventDefault();
        }, false );

        canvas.addEventListener( 'webglcontextrestored', function () {
            self.contextRestored();
        }, false );


        if ( Notify.reportWebGLError || options.reportWebGLError ) {
            gl = WebGLDebugUtils.makeDebugContext( gl );
        }


        if ( gl ) {
            this.setGraphicContext( gl );
            MACROUTILS.init();
            this._canvas = canvas;
            this._frameRate = 60.0;
            osgUtil.UpdateVisitor = UpdateVisitor;
            osgUtil.CullVisitor = CullVisitor;
            this._urlOptions = true;

            // default argument for mouse binding
            var eventsBackend = this._options.EventBackend || {};
            this._options.EventBackend = eventsBackend;

            eventsBackend.StandardMouseKeyboard = this._options.EventBackend.StandardMouseKeyboard || {};
            var mouseEventNode = eventsBackend.StandardMouseKeyboard.mouseEventNode || options.mouseEventNode || canvas;
            eventsBackend.StandardMouseKeyboard.mouseEventNode = mouseEventNode;
            eventsBackend.StandardMouseKeyboard.keyboardEventNode = eventsBackend.StandardMouseKeyboard.keyboardEventNode || document;

            // hammer
            eventsBackend.Hammer = eventsBackend.Hammer || {};
            eventsBackend.Hammer.eventNode = eventsBackend.Hammer.eventNode || options.mouseEventNode || canvas;

            // gamepade
            eventsBackend.GamePad = eventsBackend.GamePad || {};

            this.setUpView( canvas );
        } else {
            throw 'No WebGL implementation found';
        }
    };


    Viewer.prototype = MACROUTILS.objectInehrit( View.prototype, {

        contextLost: function () {
            Notify.log( 'webgl context lost' );
            window.cancelRequestAnimFrame( this._requestID );
        },
        contextRestored: function () {
            Notify.log( 'webgl context restored, but not supported - reload the page' );
        },

        init: function () {
            this._done = false;
            this._state = new State();

            var gl = this.getGraphicContext();
            this._state.setGraphicContext( gl );
            gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );

            this._updateVisitor = new osgUtil.UpdateVisitor();
            this._cullVisitor = new osgUtil.CullVisitor();

            this._renderStage = new RenderStage();
            this._stateGraph = new StateGraph();

            if ( this._urlOptions ) {
                this.parseOptions();
            }

            this.getCamera().setClearColor( [ 0.0, 0.0, 0.0, 0.0 ] );
            this._eventProxy = this.initEventProxy( this._options );
        },
        getState: function () {
            // would have more sense to be in view
            // but I would need to put cull and draw on lower Object
            // in View or a new Renderer object
            return this._state;
        },
        parseOptions: function () {

            var optionsURL = function () {
                var vars = [],
                    hash;
                var hashes = window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ).split( '&' );
                for ( var i = 0; i < hashes.length; i++ ) {
                    hash = hashes[ i ].split( '=' );
                    var element = hash[ 0 ].toLowerCase();
                    vars.push( element );
                    var result = hash[ 1 ];
                    if ( result === undefined ) {
                        result = '1';
                    }
                    vars[ element ] = result.toLowerCase();

                }
                return vars;
            };

            var options = optionsURL();

            if ( options.stats === '1' ) {
                this.initStats( options );
            }

            var gl = this.getGraphicContext();
            // not the best way to do it
            if ( options.depth_test === '0' ) {
                this.getGraphicContext().disable( gl.DEPTH_TEST );
            }
            if ( options.blend === '0' ) {
                this.getGraphicContext().disable( gl.BLEND );
            }
            if ( options.cull_face === '0' ) {
                this.getGraphicContext().disable( gl.CULL_FACE );
            }
            if ( options.light === '0' ) {
                this.setLightingMode( View.LightingMode.NO_LIGHT );
            }

        },

        initStats: function ( options ) {

            var maxMS = 35;
            var stepMS = 5;
            var fontsize = 14;

            if ( options.statsMaxMS !== undefined ) {
                maxMS = parseInt( options.statsMaxMS, 10 );
            }
            if ( options.statsStepMS !== undefined ) {
                stepMS = parseInt( options.statsStepMS, 10 );
            }

            var createDomElements = function ( elementToAppend ) {
                var dom = [
                    '<div id="StatsDiv" style="top: 0; position: absolute; width: 300px; height: 150px; z-index: 10;">',

                    '<div id="StatsCanvasDiv" style="position: relative;">',
                    '<canvas id="StatsCanvasGrid" width="300" height="150" style="z-index:-1; position: absolute; background: rgba(14,14,14,0.8); " ></canvas>',
                    '<canvas id="StatsCanvas" width="300" height="150" style="z-index:8; position: absolute;" ></canvas>',
                    '<canvas id="StatsCanvasText" width="300" height="150" style="z-index:9; position: absolute;" ></canvas>',
                    '</div>',

                    '</div>'
                ].join( '\n' );
                var parent;
                if ( elementToAppend === undefined ) {
                    parent = document.body;
                    //elementToAppend = 'body';
                } else {
                    parent = document.getElementById( elementToAppend );
                }

                //jQuery(dom).appendTo(elementToAppend);
                var mydiv = document.createElement( 'div' );
                mydiv.innerHTML = dom;
                parent.appendChild( mydiv );

                var grid = document.getElementById( 'StatsCanvasGrid' );
                var ctx = grid.getContext( '2d' );
                ctx.clearRect( 0, 0, grid.width, grid.height );

                var step = Math.floor( maxMS / stepMS ).toFixed( 0 );
                var r = grid.height / step;
                ctx.strokeStyle = 'rgb(70,70,70)';
                for ( var i = 0, l = step; i < l; i++ ) {
                    ctx.beginPath();
                    ctx.moveTo( 0, i * r );
                    ctx.lineTo( grid.width, i * r );
                    ctx.stroke();
                }


                return {
                    graph: document.getElementById( 'StatsCanvas' ),
                    text: document.getElementById( 'StatsCanvasText' )
                };
            };

            if ( this._canvasStats === undefined || this._canvasStats === null ) {
                var domStats = createDomElements();
                this._canvasStats = domStats.graph;
                this._canvasStatsText = domStats.text;
            }
            this._stats = new Stats.Stats( this._canvasStats, this._canvasStatsText );
            var that = this;
            this._frameRate = 1;
            this._frameTime = 0;
            this._updateTime = 0;
            this._cullTime = 0;
            this._drawTime = 0;
            this._stats.addLayer( '#ff0fff', 120,
                function ( t ) {
                    return ( 1000.0 / that._frameRate );
                },
                function ( a ) {
                    return 'FrameRate: ' + ( a ).toFixed( 0 ) + ' fps';
                } );

            this._stats.addLayer( '#ffff00', maxMS,
                function ( t ) {
                    return that._frameTime;
                },
                function ( a ) {
                    return 'FrameTime: ' + a.toFixed( 2 ) + ' ms';
                } );

            this._stats.addLayer( '#d07b1f', maxMS,
                function ( t ) {
                    return that._updateTime;
                },
                function ( a ) {
                    return 'UpdateTime: ' + a.toFixed( 2 ) + ' ms';
                } );

            this._stats.addLayer( '#73e0ff', maxMS,
                function ( t ) {
                    return that._cullTime;
                },
                function ( a ) {
                    return 'CullTime: ' + a.toFixed( 2 ) + ' ms';
                } );

            this._stats.addLayer( '#ff0000', maxMS,
                function ( t ) {
                    return that._drawTime;
                },
                function ( a ) {
                    return 'DrawTime: ' + a.toFixed( 2 ) + ' ms';
                } );

            if ( window.performance && window.performance.memory && window.performance.memory.totalJSHeapSize )
                this._stats.addLayer( '#00ff00', window.performance.memory.totalJSHeapSize * 2,
                    function ( t ) {
                        return that._memSize;
                    },
                    function ( a ) {
                        return 'Memory : ' + a.toFixed( 0 ) + ' b';
                    } );

        },

        update: function () {
            this.getScene().accept( this._updateVisitor );
        },
        cull: function () {
            // this part of code should be called for each view
            // right now, we dont support multi view
            this._stateGraph.clean();
            this._renderStage.reset();

            this._cullVisitor.reset();
            this._cullVisitor.setStateGraph( this._stateGraph );
            this._cullVisitor.setRenderStage( this._renderStage );
            var camera = this.getCamera();
            this._cullVisitor.pushStateSet( camera.getStateSet() );
            this._cullVisitor.pushProjectionMatrix( camera.getProjectionMatrix() );

            // update bound
            var bs = camera.getBound();

            var identity = Matrix.makeIdentity( [] );
            this._cullVisitor.pushModelviewMatrix( identity );

            if ( this._light ) {
                this._cullVisitor.addPositionedAttribute( this._light );
            }

            this._cullVisitor.pushModelviewMatrix( camera.getViewMatrix() );
            this._cullVisitor.pushViewport( camera.getViewport() );
            this._cullVisitor.setCullSettings( camera );

            this._renderStage.setClearDepth( camera.getClearDepth() );
            this._renderStage.setClearColor( camera.getClearColor() );
            this._renderStage.setClearMask( camera.getClearMask() );
            this._renderStage.setViewport( camera.getViewport() );

            //CullVisitor.prototype.handleCullCallbacksAndTraverse.call(this._cullVisitor,camera);
            this.getScene().accept( this._cullVisitor );

            // fix projection matrix if camera has near/far auto compute
            this._cullVisitor.popModelviewMatrix();
            this._cullVisitor.popProjectionMatrix();
            this._cullVisitor.popViewport();
            this._cullVisitor.popStateSet();

            this._renderStage.sort();
        },
        draw: function () {
            var state = this.getState();
            this._renderStage.draw( state );

            // noticed that we accumulate lot of stack, maybe because of the stateGraph
            state.popAllStateSets();
            state.applyWithoutProgram(); //state.apply(); // apply default state (global)
        },

        frame: function () {
            var frameTime, beginFrameTime;
            frameTime = MACROUTILS.performance.now();
            if ( this._lastFrameTime === undefined ) {
                this._lastFrameTime = 0;
            }
            this._frameRate = frameTime - this._lastFrameTime;
            this._lastFrameTime = frameTime;
            beginFrameTime = frameTime;

            var frameStamp = this.getFrameStamp();

            if ( frameStamp.getFrameNumber() === 0 ) {
                frameStamp.setReferenceTime( frameTime / 1000.0 );
                this._numberFrame = 0;
            }

            frameStamp.setSimulationTime( frameTime / 1000.0 - frameStamp.getReferenceTime() );

            // setup framestamp
            this._updateVisitor.setFrameStamp( frameStamp );
            //this._cullVisitor.setFrameStamp(this.getFrameStamp());

            // update inputs devices
            this.updateEventProxy( this._eventProxy, frameStamp );

            // Update Manipulator/Event
            // should be merged with the update of game pad below
            if ( this.getManipulator() ) {
                this.getManipulator().update( this._updateVisitor );
                Matrix.copy( this.getManipulator().getInverseMatrix(), this.getCamera().getViewMatrix() );
            }

            if ( this._stats === undefined ) {
                // time the update
                this.update();
                this.cull();
                this.draw();
                frameStamp.setFrameNumber( frameStamp.getFrameNumber() + 1 );
                this._numberFrame++;
                this._frameTime = MACROUTILS.performance.now() - beginFrameTime;
            } else {
                this._updateTime = MACROUTILS.performance.now();
                this.update();
                this._updateTime = MACROUTILS.performance.now() - this._updateTime;


                this._cullTime = MACROUTILS.performance.now();
                this.cull();
                this._cullTime = MACROUTILS.performance.now() - this._cullTime;

                this._drawTime = MACROUTILS.performance.now();
                this.draw();
                this._drawTime = MACROUTILS.performance.now() - this._drawTime;

                frameStamp.setFrameNumber( frameStamp.getFrameNumber() + 1 );

                this._numberFrame++;
                this._frameTime = MACROUTILS.performance.now() - beginFrameTime;

                if ( window.performance && window.performance.memory && window.performance.memory.usedJSHeapSize )
                    this._memSize = window.performance.memory.usedJSHeapSize;
                this._stats.update();
            }
        },

        setDone: function ( bool ) {
            this._done = bool;
        },
        done: function () {
            return this._done;
        },

        run: function () {
            var self = this;
            var render = function () {
                if ( !self.done() ) {
                    self._requestID = window.requestAnimationFrame( render, self.canvas );
                    self.frame();
                }
            };
            render();
        },

        setupManipulator: function ( manipulator, dontBindDefaultEvent ) {
            if ( manipulator === undefined ) {
                manipulator = new OrbitManipulator();
            }

            if ( manipulator.setNode !== undefined ) {
                manipulator.setNode( this.getSceneData() );
            } else {
                // for backward compatibility
                manipulator.view = this;
            }

            this.setManipulator( manipulator );

            var that = this;
            var viewer = this;

            var self = this;
            var resize = function ( ev ) {
                var w = window.innerWidth;
                var h = window.innerHeight;

                var camera = self.getCamera();
                var vp = camera.getViewport();

                var prevWidth = vp.width();
                var prevHeight = vp.height();
                self._canvas.width = w;
                self._canvas.height = h;
                self._canvas.style.width = w;
                self._canvas.style.height = h;
                Notify.debug( 'window resize ' + prevWidth + 'x' + prevHeight + ' to ' + w + 'x' + h );
                var widthChangeRatio = w / prevWidth;
                var heightChangeRatio = h / prevHeight;
                var aspectRatioChange = widthChangeRatio / heightChangeRatio;
                vp.setViewport( vp.x() * widthChangeRatio, vp.y() * heightChangeRatio, vp.width() * widthChangeRatio, vp.height() * heightChangeRatio );

                if ( aspectRatioChange !== 1.0 ) {
                    Matrix.preMult( camera.getProjectionMatrix(), Matrix.makeScale( 1.0 / aspectRatioChange, 1.0, 1.0, [] ) );
                }
            };
            window.onresize = resize;
        },

        // intialize all input devices
        initEventProxy: function ( argsObject ) {
            var args = argsObject || {};
            var deviceEnabled = {};

            var lists = EventProxy;
            var argumentEventBackend = args.EventBackend;
            // loop on each devices and try to initialize it
            var keys = Object.keys( lists );
            for ( var i = 0, l = keys.length; i < l; i++ ) {
                var device = keys[ i ];

                // check if the config has a require
                var initialize = true;
                var argDevice = {};
                if ( argumentEventBackend && ( argumentEventBackend[ device ] !== undefined ) ) {
                    initialize = argumentEventBackend[ device ].enable || true;
                    argDevice = argumentEventBackend[ device ];
                }

                if ( initialize ) {
                    var inputDevice = new lists[ device ]( this );
                    inputDevice.init( argDevice );
                    deviceEnabled[ device ] = inputDevice;
                }
            }
            return deviceEnabled;
        },
        updateEventProxy: function ( list, frameStamp ) {
            var keys = Object.keys( list );
            keys.forEach( function ( key ) {
                var device = list[ key ];
                if ( device.update )
                    device.update( frameStamp );
            } );
        }

    } );

    return Viewer;
} );
!function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i}({1:[function(require,module,exports){window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)}}();Leap=require("../lib/index")},{"../lib/index":2}],3:[function(require,module,exports){var CircularBuffer=module.exports=function(size){this.pos=0;this._buf=[];this.size=size};CircularBuffer.prototype.get=function(i){if(i==undefined)i=0;if(i>=this.size)return undefined;if(i>=this._buf.length)return undefined;return this._buf[(this.pos-i-1)%this.size]};CircularBuffer.prototype.push=function(o){this._buf[this.pos%this.size]=o;return this.pos++}},{}],4:[function(require,module,exports){},{}],5:[function(require,module,exports){var process=module.exports={};process.nextTick=function(){var canSetImmediate=typeof window!=="undefined"&&window.setImmediate;var canPost=typeof window!=="undefined"&&window.postMessage&&window.addEventListener;if(canSetImmediate){return function(f){return window.setImmediate(f)}}if(canPost){var queue=[];window.addEventListener("message",function(ev){if(ev.source===window&&ev.data==="process-tick"){ev.stopPropagation();if(queue.length>0){var fn=queue.shift();fn()}}},true);return function nextTick(fn){queue.push(fn);window.postMessage("process-tick","*")}}return function nextTick(fn){setTimeout(fn,0)}}();process.title="browser";process.browser=true;process.env={};process.argv=[];process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")}},{}],6:[function(require,module,exports){!function(process){if(!process.EventEmitter)process.EventEmitter=function(){};var EventEmitter=exports.EventEmitter=process.EventEmitter;var isArray=typeof Array.isArray==="function"?Array.isArray:function(xs){return Object.prototype.toString.call(xs)==="[object Array]"};function indexOf(xs,x){if(xs.indexOf)return xs.indexOf(x);for(var i=0;i<xs.length;i++){if(x===xs[i])return i}return-1}var defaultMaxListeners=10;EventEmitter.prototype.setMaxListeners=function(n){if(!this._events)this._events={};this._events.maxListeners=n};EventEmitter.prototype.emit=function(type){if(type==="error"){if(!this._events||!this._events.error||isArray(this._events.error)&&!this._events.error.length){if(arguments[1]instanceof Error){throw arguments[1]}else{throw new Error("Uncaught, unspecified 'error' event.")}return false}}if(!this._events)return false;var handler=this._events[type];if(!handler)return false;if(typeof handler=="function"){switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:var args=Array.prototype.slice.call(arguments,1);handler.apply(this,args)}return true}else if(isArray(handler)){var args=Array.prototype.slice.call(arguments,1);var listeners=handler.slice();for(var i=0,l=listeners.length;i<l;i++){listeners[i].apply(this,args)}return true}else{return false}};EventEmitter.prototype.addListener=function(type,listener){if("function"!==typeof listener){throw new Error("addListener only takes instances of Function")}if(!this._events)this._events={};this.emit("newListener",type,listener);if(!this._events[type]){this._events[type]=listener}else if(isArray(this._events[type])){if(!this._events[type].warned){var m;if(this._events.maxListeners!==undefined){m=this._events.maxListeners}else{m=defaultMaxListeners}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[type].length);console.trace()}}this._events[type].push(listener)}else{this._events[type]=[this._events[type],listener]}return this};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){var self=this;self.on(type,function g(){self.removeListener(type,g);listener.apply(this,arguments)});return this};EventEmitter.prototype.removeListener=function(type,listener){if("function"!==typeof listener){throw new Error("removeListener only takes instances of Function")}if(!this._events||!this._events[type])return this;var list=this._events[type];if(isArray(list)){var i=indexOf(list,listener);if(i<0)return this;list.splice(i,1);if(list.length==0)delete this._events[type]}else if(this._events[type]===listener){delete this._events[type]}return this};EventEmitter.prototype.removeAllListeners=function(type){if(arguments.length===0){this._events={};return this}if(type&&this._events&&this._events[type])this._events[type]=null;return this};EventEmitter.prototype.listeners=function(type){if(!this._events)this._events={};if(!this._events[type])this._events[type]=[];if(!isArray(this._events[type])){this._events[type]=[this._events[type]]}return this._events[type]}}(require("__browserify_process"))},{__browserify_process:5}],2:[function(require,module,exports){!function(){module.exports={Controller:require("./controller"),Frame:require("./frame"),Gesture:require("./gesture"),Hand:require("./hand"),Pointable:require("./pointable"),InteractionBox:require("./interaction_box"),Connection:require("./connection"),CircularBuffer:require("./circular_buffer"),UI:require("./ui"),glMatrix:require("gl-matrix"),mat3:require("gl-matrix").mat3,vec3:require("gl-matrix").vec3,loopController:undefined,loop:function(opts,callback){if(callback===undefined){callback=opts;opts={}}if(!this.loopController)this.loopController=new this.Controller(opts);this.loopController.loop(callback)}}}()},{"./circular_buffer":3,"./connection":7,"./controller":8,"./frame":9,"./gesture":10,"./hand":11,"./interaction_box":12,"./pointable":13,"./ui":14,"gl-matrix":15}],7:[function(require,module,exports){var Connection=module.exports=require("./base_connection");Connection.prototype.setupSocket=function(){var connection=this;var socket;try{socket=new WebSocket(this.getUrl())}catch(error){console.error(error);return undefined}socket.onopen=function(){connection.handleOpen()};socket.onmessage=function(message){connection.handleData(message.data)};socket.onclose=function(){connection.handleClose()};return socket};Connection.prototype.startHeartbeat=function(){if(!this.protocol.sendHeartbeat||this.heartbeatTimer)return;var connection=this;var propertyName=null;if(typeof document.hidden!=="undefined"){propertyName="hidden"}else if(typeof document.mozHidden!=="undefined"){propertyName="mozHidden"}else if(typeof document.msHidden!=="undefined"){propertyName="msHidden"}else if(typeof document.webkitHidden!=="undefined"){propertyName="webkitHidden"}else{propertyName=undefined}var windowVisible=true;var focusListener=window.addEventListener("focus",function(e){windowVisible=true});var blurListener=window.addEventListener("blur",function(e){windowVisible=false});this.on("disconnect",function(){if(connection.heartbeatTimer){clearTimeout(connection.heartbeatTimer);delete connection.heartbeatTimer}window.removeEventListener(focusListener);window.removeEventListener(blurListener)});this.heartbeatTimer=setInterval(function(){var isVisible=propertyName===undefined?true:document[propertyName]===false;if(isVisible&&windowVisible){connection.sendHeartbeat()}else{connection.setHeartbeatState(false)}},this.opts.heartbeatInterval)}},{"./base_connection":16}],14:[function(require,module,exports){exports.UI={Region:require("./ui/region"),Cursor:require("./ui/cursor")}},{"./ui/cursor":17,"./ui/region":18}],15:[function(require,module,exports){!function(){!function(){"use strict";var shim={};if(typeof exports==="undefined"){if(typeof define=="function"&&typeof define.amd=="object"&&define.amd){shim.exports={};define(function(){return shim.exports})}else{shim.exports=window}}else{shim.exports=exports}!function(exports){var vec2={};if(!GLMAT_EPSILON){var GLMAT_EPSILON=1e-6}vec2.create=function(){return new Float32Array(2)};vec2.clone=function(a){var out=new Float32Array(2);out[0]=a[0];out[1]=a[1];return out};vec2.fromValues=function(x,y){var out=new Float32Array(2);out[0]=x;out[1]=y;return out};vec2.copy=function(out,a){out[0]=a[0];out[1]=a[1];return out};vec2.set=function(out,x,y){out[0]=x;out[1]=y;return out};vec2.add=function(out,a,b){out[0]=a[0]+b[0];out[1]=a[1]+b[1];return out};vec2.sub=vec2.subtract=function(out,a,b){out[0]=a[0]-b[0];out[1]=a[1]-b[1];return out};vec2.mul=vec2.multiply=function(out,a,b){out[0]=a[0]*b[0];out[1]=a[1]*b[1];return out};vec2.div=vec2.divide=function(out,a,b){out[0]=a[0]/b[0];out[1]=a[1]/b[1];return out};vec2.min=function(out,a,b){out[0]=Math.min(a[0],b[0]);out[1]=Math.min(a[1],b[1]);return out};vec2.max=function(out,a,b){out[0]=Math.max(a[0],b[0]);out[1]=Math.max(a[1],b[1]);return out};vec2.scale=function(out,a,b){out[0]=a[0]*b;out[1]=a[1]*b;return out};vec2.dist=vec2.distance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1];return Math.sqrt(x*x+y*y)};vec2.sqrDist=vec2.squaredDistance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1];return x*x+y*y};vec2.len=vec2.length=function(a){var x=a[0],y=a[1];return Math.sqrt(x*x+y*y)};vec2.sqrLen=vec2.squaredLength=function(a){var x=a[0],y=a[1];return x*x+y*y};vec2.negate=function(out,a){out[0]=-a[0];out[1]=-a[1];return out};vec2.normalize=function(out,a){var x=a[0],y=a[1];var len=x*x+y*y;if(len>0){len=1/Math.sqrt(len);out[0]=a[0]*len;out[1]=a[1]*len}return out};vec2.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]};vec2.cross=function(out,a,b){var z=a[0]*b[1]-a[1]*b[0];out[0]=out[1]=0;out[2]=z;return out};vec2.lerp=function(out,a,b,t){var ax=a[0],ay=a[1];out[0]=ax+t*(b[0]-ax);out[1]=ay+t*(b[1]-ay);return out};vec2.transformMat2=function(out,a,m){var x=a[0],y=a[1];out[0]=x*m[0]+y*m[1];out[1]=x*m[2]+y*m[3];return out};vec2.forEach=function(){var vec=new Float32Array(2);return function(a,stride,offset,count,fn,arg){var i,l;if(!stride){stride=2}if(!offset){offset=0}if(count){l=Math.min(count*stride+offset,a.length)}else{l=a.length}for(i=offset;i<l;i+=stride){vec[0]=a[i];vec[1]=a[i+1];fn(vec,vec,arg);a[i]=vec[0];a[i+1]=vec[1]}return a}}();vec2.str=function(a){return"vec2("+a[0]+", "+a[1]+")"};if(typeof exports!=="undefined"){exports.vec2=vec2}var vec3={};if(!GLMAT_EPSILON){var GLMAT_EPSILON=1e-6}vec3.create=function(){return new Float32Array(3)};vec3.clone=function(a){var out=new Float32Array(3);out[0]=a[0];out[1]=a[1];out[2]=a[2];return out};vec3.fromValues=function(x,y,z){var out=new Float32Array(3);out[0]=x;out[1]=y;out[2]=z;return out};vec3.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];return out};vec3.set=function(out,x,y,z){out[0]=x;out[1]=y;out[2]=z;return out};vec3.add=function(out,a,b){out[0]=a[0]+b[0];out[1]=a[1]+b[1];out[2]=a[2]+b[2];return out};vec3.sub=vec3.subtract=function(out,a,b){out[0]=a[0]-b[0];out[1]=a[1]-b[1];out[2]=a[2]-b[2];return out};vec3.mul=vec3.multiply=function(out,a,b){out[0]=a[0]*b[0];out[1]=a[1]*b[1];out[2]=a[2]*b[2];return out};vec3.div=vec3.divide=function(out,a,b){out[0]=a[0]/b[0];out[1]=a[1]/b[1];out[2]=a[2]/b[2];return out};vec3.min=function(out,a,b){out[0]=Math.min(a[0],b[0]);out[1]=Math.min(a[1],b[1]);out[2]=Math.min(a[2],b[2]);return out};vec3.max=function(out,a,b){out[0]=Math.max(a[0],b[0]);out[1]=Math.max(a[1],b[1]);out[2]=Math.max(a[2],b[2]);return out};vec3.scale=function(out,a,b){out[0]=a[0]*b;out[1]=a[1]*b;out[2]=a[2]*b;return out};vec3.dist=vec3.distance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1],z=b[2]-a[2];return Math.sqrt(x*x+y*y+z*z)};vec3.sqrDist=vec3.squaredDistance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1],z=b[2]-a[2];return x*x+y*y+z*z};vec3.len=vec3.length=function(a){var x=a[0],y=a[1],z=a[2];return Math.sqrt(x*x+y*y+z*z)};vec3.sqrLen=vec3.squaredLength=function(a){var x=a[0],y=a[1],z=a[2];return x*x+y*y+z*z};vec3.negate=function(out,a){out[0]=-a[0];out[1]=-a[1];out[2]=-a[2];return out};vec3.normalize=function(out,a){var x=a[0],y=a[1],z=a[2];var len=x*x+y*y+z*z;if(len>0){len=1/Math.sqrt(len);out[0]=a[0]*len;out[1]=a[1]*len;out[2]=a[2]*len}return out};vec3.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]};vec3.cross=function(out,a,b){var ax=a[0],ay=a[1],az=a[2],bx=b[0],by=b[1],bz=b[2];out[0]=ay*bz-az*by;out[1]=az*bx-ax*bz;out[2]=ax*by-ay*bx;return out};vec3.lerp=function(out,a,b,t){var ax=a[0],ay=a[1],az=a[2];out[0]=ax+t*(b[0]-ax);out[1]=ay+t*(b[1]-ay);out[2]=az+t*(b[2]-az);return out};vec3.transformMat4=function(out,a,m){var x=a[0],y=a[1],z=a[2];out[0]=m[0]*x+m[4]*y+m[8]*z+m[12];out[1]=m[1]*x+m[5]*y+m[9]*z+m[13];out[2]=m[2]*x+m[6]*y+m[10]*z+m[14];return out};vec3.transformQuat=function(out,a,q){var x=a[0],y=a[1],z=a[2],qx=q[0],qy=q[1],qz=q[2],qw=q[3],ix=qw*x+qy*z-qz*y,iy=qw*y+qz*x-qx*z,iz=qw*z+qx*y-qy*x,iw=-qx*x-qy*y-qz*z;out[0]=ix*qw+iw*-qx+iy*-qz-iz*-qy;out[1]=iy*qw+iw*-qy+iz*-qx-ix*-qz;out[2]=iz*qw+iw*-qz+ix*-qy-iy*-qx;return out};vec3.forEach=function(){var vec=new Float32Array(3);return function(a,stride,offset,count,fn,arg){var i,l;if(!stride){stride=3}if(!offset){offset=0}if(count){l=Math.min(count*stride+offset,a.length)}else{l=a.length}for(i=offset;i<l;i+=stride){vec[0]=a[i];vec[1]=a[i+1];vec[2]=a[i+2];fn(vec,vec,arg);a[i]=vec[0];a[i+1]=vec[1];a[i+2]=vec[2]}return a}}();vec3.str=function(a){return"vec3("+a[0]+", "+a[1]+", "+a[2]+")"};if(typeof exports!=="undefined"){exports.vec3=vec3}var vec4={};if(!GLMAT_EPSILON){var GLMAT_EPSILON=1e-6}vec4.create=function(){return new Float32Array(4)};vec4.clone=function(a){var out=new Float32Array(4);out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];return out};vec4.fromValues=function(x,y,z,w){var out=new Float32Array(4);out[0]=x;out[1]=y;out[2]=z;out[3]=w;return out};vec4.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];return out};vec4.set=function(out,x,y,z,w){out[0]=x;out[1]=y;out[2]=z;out[3]=w;return out};vec4.add=function(out,a,b){out[0]=a[0]+b[0];out[1]=a[1]+b[1];out[2]=a[2]+b[2];out[3]=a[3]+b[3];return out};vec4.sub=vec4.subtract=function(out,a,b){out[0]=a[0]-b[0];out[1]=a[1]-b[1];out[2]=a[2]-b[2];out[3]=a[3]-b[3];return out};vec4.mul=vec4.multiply=function(out,a,b){out[0]=a[0]*b[0];out[1]=a[1]*b[1];out[2]=a[2]*b[2];out[3]=a[3]*b[3];return out};vec4.div=vec4.divide=function(out,a,b){out[0]=a[0]/b[0];out[1]=a[1]/b[1];out[2]=a[2]/b[2];out[3]=a[3]/b[3];return out};vec4.min=function(out,a,b){out[0]=Math.min(a[0],b[0]);out[1]=Math.min(a[1],b[1]);out[2]=Math.min(a[2],b[2]);out[3]=Math.min(a[3],b[3]);return out};vec4.max=function(out,a,b){out[0]=Math.max(a[0],b[0]);out[1]=Math.max(a[1],b[1]);out[2]=Math.max(a[2],b[2]);out[3]=Math.max(a[3],b[3]);return out};vec4.scale=function(out,a,b){out[0]=a[0]*b;out[1]=a[1]*b;out[2]=a[2]*b;out[3]=a[3]*b;return out};vec4.dist=vec4.distance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1],z=b[2]-a[2],w=b[3]-a[3];return Math.sqrt(x*x+y*y+z*z+w*w)};vec4.sqrDist=vec4.squaredDistance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1],z=b[2]-a[2],w=b[3]-a[3];return x*x+y*y+z*z+w*w};vec4.len=vec4.length=function(a){var x=a[0],y=a[1],z=a[2],w=a[3];return Math.sqrt(x*x+y*y+z*z+w*w)};vec4.sqrLen=vec4.squaredLength=function(a){var x=a[0],y=a[1],z=a[2],w=a[3];return x*x+y*y+z*z+w*w};vec4.negate=function(out,a){out[0]=-a[0];out[1]=-a[1];out[2]=-a[2];out[3]=-a[3];return out};vec4.normalize=function(out,a){var x=a[0],y=a[1],z=a[2],w=a[3];var len=x*x+y*y+z*z+w*w;if(len>0){len=1/Math.sqrt(len);out[0]=a[0]*len;out[1]=a[1]*len;out[2]=a[2]*len;out[3]=a[3]*len}return out};vec4.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]};vec4.lerp=function(out,a,b,t){var ax=a[0],ay=a[1],az=a[2],aw=a[3];out[0]=ax+t*(b[0]-ax);out[1]=ay+t*(b[1]-ay);out[2]=az+t*(b[2]-az);out[3]=aw+t*(b[3]-aw);return out};vec4.transformMat4=function(out,a,m){var x=a[0],y=a[1],z=a[2],w=a[3];out[0]=m[0]*x+m[4]*y+m[8]*z+m[12]*w;out[1]=m[1]*x+m[5]*y+m[9]*z+m[13]*w;out[2]=m[2]*x+m[6]*y+m[10]*z+m[14]*w;out[3]=m[3]*x+m[7]*y+m[11]*z+m[15]*w;return out};vec4.transformQuat=function(out,a,q){var x=a[0],y=a[1],z=a[2],qx=q[0],qy=q[1],qz=q[2],qw=q[3],ix=qw*x+qy*z-qz*y,iy=qw*y+qz*x-qx*z,iz=qw*z+qx*y-qy*x,iw=-qx*x-qy*y-qz*z;out[0]=ix*qw+iw*-qx+iy*-qz-iz*-qy;out[1]=iy*qw+iw*-qy+iz*-qx-ix*-qz;out[2]=iz*qw+iw*-qz+ix*-qy-iy*-qx;return out};vec4.forEach=function(){var vec=new Float32Array(4);return function(a,stride,offset,count,fn,arg){var i,l;if(!stride){stride=4}if(!offset){offset=0}if(count){l=Math.min(count*stride+offset,a.length)}else{l=a.length}for(i=offset;i<l;i+=stride){vec[0]=a[i];vec[1]=a[i+1];vec[2]=a[i+2];vec[3]=a[i+3];fn(vec,vec,arg);a[i]=vec[0];a[i+1]=vec[1];a[i+2]=vec[2];a[i+3]=vec[3]}return a}}();vec4.str=function(a){return"vec4("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+")"};if(typeof exports!=="undefined"){exports.vec4=vec4}var mat2={};var mat2Identity=new Float32Array([1,0,0,1]);if(!GLMAT_EPSILON){var GLMAT_EPSILON=1e-6}mat2.create=function(){return new Float32Array(mat2Identity)};mat2.clone=function(a){var out=new Float32Array(4);out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];return out};mat2.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];return out};mat2.identity=function(out){out[0]=1;out[1]=0;out[2]=0;out[3]=1;return out};mat2.transpose=function(out,a){if(out===a){var a1=a[1];out[1]=a[2];out[2]=a1}else{out[0]=a[0];out[1]=a[2];out[2]=a[1];out[3]=a[3]}return out};mat2.invert=function(out,a){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],det=a0*a3-a2*a1;if(!det){return null}det=1/det;out[0]=a3*det;out[1]=-a1*det;out[2]=-a2*det;out[3]=a0*det;return out};mat2.adjoint=function(out,a){var a0=a[0];out[0]=a[3];out[1]=-a[1];out[2]=-a[2];out[3]=a0;return out};mat2.determinant=function(a){return a[0]*a[3]-a[2]*a[1]};mat2.mul=mat2.multiply=function(out,a,b){var a0=a[0],a1=a[1],a2=a[2],a3=a[3];var b0=b[0],b1=b[1],b2=b[2],b3=b[3];out[0]=a0*b0+a1*b2;out[1]=a0*b1+a1*b3;out[2]=a2*b0+a3*b2;out[3]=a2*b1+a3*b3;return out};mat2.rotate=function(out,a,rad){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],s=Math.sin(rad),c=Math.cos(rad);out[0]=a0*c+a1*s;out[1]=a0*-s+a1*c;out[2]=a2*c+a3*s;out[3]=a2*-s+a3*c;return out};mat2.scale=function(out,a,v){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],v0=v[0],v1=v[1];out[0]=a0*v0;out[1]=a1*v1;out[2]=a2*v0;out[3]=a3*v1;return out};mat2.str=function(a){return"mat2("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+")"};if(typeof exports!=="undefined"){exports.mat2=mat2}var mat3={};var mat3Identity=new Float32Array([1,0,0,0,1,0,0,0,1]);if(!GLMAT_EPSILON){var GLMAT_EPSILON=1e-6}mat3.create=function(){return new Float32Array(mat3Identity)};mat3.clone=function(a){var out=new Float32Array(9);out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[8]=a[8];return out};mat3.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[8]=a[8];return out};mat3.identity=function(out){out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=1;out[5]=0;out[6]=0;out[7]=0;out[8]=1;return out};mat3.transpose=function(out,a){if(out===a){var a01=a[1],a02=a[2],a12=a[5];out[1]=a[3];out[2]=a[6];out[3]=a01;out[5]=a[7];out[6]=a02;out[7]=a12}else{out[0]=a[0];out[1]=a[3];out[2]=a[6];out[3]=a[1];out[4]=a[4];out[5]=a[7];out[6]=a[2];out[7]=a[5];out[8]=a[8]}return out};mat3.invert=function(out,a){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8],b01=a22*a11-a12*a21,b11=-a22*a10+a12*a20,b21=a21*a10-a11*a20,det=a00*b01+a01*b11+a02*b21;if(!det){return null}det=1/det;out[0]=b01*det;out[1]=(-a22*a01+a02*a21)*det;out[2]=(a12*a01-a02*a11)*det;out[3]=b11*det;out[4]=(a22*a00-a02*a20)*det;out[5]=(-a12*a00+a02*a10)*det;out[6]=b21*det;out[7]=(-a21*a00+a01*a20)*det;out[8]=(a11*a00-a01*a10)*det;return out};mat3.adjoint=function(out,a){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8];out[0]=a11*a22-a12*a21;out[1]=a02*a21-a01*a22;out[2]=a01*a12-a02*a11;out[3]=a12*a20-a10*a22;out[4]=a00*a22-a02*a20;out[5]=a02*a10-a00*a12;out[6]=a10*a21-a11*a20;out[7]=a01*a20-a00*a21;out[8]=a00*a11-a01*a10;return out};mat3.determinant=function(a){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8];return a00*(a22*a11-a12*a21)+a01*(-a22*a10+a12*a20)+a02*(a21*a10-a11*a20)};mat3.mul=mat3.multiply=function(out,a,b){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8],b00=b[0],b01=b[1],b02=b[2],b10=b[3],b11=b[4],b12=b[5],b20=b[6],b21=b[7],b22=b[8];out[0]=b00*a00+b01*a10+b02*a20;out[1]=b00*a01+b01*a11+b02*a21;out[2]=b00*a02+b01*a12+b02*a22;out[3]=b10*a00+b11*a10+b12*a20;out[4]=b10*a01+b11*a11+b12*a21;out[5]=b10*a02+b11*a12+b12*a22;out[6]=b20*a00+b21*a10+b22*a20;out[7]=b20*a01+b21*a11+b22*a21;out[8]=b20*a02+b21*a12+b22*a22;return out};mat3.str=function(a){return"mat3("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+")"};if(typeof exports!=="undefined"){exports.mat3=mat3}var mat4={};var mat4Identity=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);if(!GLMAT_EPSILON){var GLMAT_EPSILON=1e-6}mat4.create=function(){return new Float32Array(mat4Identity)};mat4.clone=function(a){var out=new Float32Array(16);out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[8]=a[8];out[9]=a[9];out[10]=a[10];out[11]=a[11];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];return out};mat4.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[8]=a[8];out[9]=a[9];out[10]=a[10];out[11]=a[11];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];return out};mat4.identity=function(out){out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=1;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=1;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out};mat4.transpose=function(out,a){if(out===a){var a01=a[1],a02=a[2],a03=a[3],a12=a[6],a13=a[7],a23=a[11];out[1]=a[4];out[2]=a[8];out[3]=a[12];out[4]=a01;out[6]=a[9];out[7]=a[13];out[8]=a02;out[9]=a12;out[11]=a[14];out[12]=a03;out[13]=a13;out[14]=a23}else{out[0]=a[0];out[1]=a[4];out[2]=a[8];out[3]=a[12];out[4]=a[1];out[5]=a[5];out[6]=a[9];out[7]=a[13];out[8]=a[2];out[9]=a[6];out[10]=a[10];out[11]=a[14];out[12]=a[3];out[13]=a[7];out[14]=a[11];out[15]=a[15]}return out};mat4.invert=function(out,a){var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15],b00=a00*a11-a01*a10,b01=a00*a12-a02*a10,b02=a00*a13-a03*a10,b03=a01*a12-a02*a11,b04=a01*a13-a03*a11,b05=a02*a13-a03*a12,b06=a20*a31-a21*a30,b07=a20*a32-a22*a30,b08=a20*a33-a23*a30,b09=a21*a32-a22*a31,b10=a21*a33-a23*a31,b11=a22*a33-a23*a32,det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;if(!det){return null}det=1/det;out[0]=(a11*b11-a12*b10+a13*b09)*det;out[1]=(a02*b10-a01*b11-a03*b09)*det;out[2]=(a31*b05-a32*b04+a33*b03)*det;out[3]=(a22*b04-a21*b05-a23*b03)*det;out[4]=(a12*b08-a10*b11-a13*b07)*det;out[5]=(a00*b11-a02*b08+a03*b07)*det;out[6]=(a32*b02-a30*b05-a33*b01)*det;out[7]=(a20*b05-a22*b02+a23*b01)*det;out[8]=(a10*b10-a11*b08+a13*b06)*det;out[9]=(a01*b08-a00*b10-a03*b06)*det;out[10]=(a30*b04-a31*b02+a33*b00)*det;out[11]=(a21*b02-a20*b04-a23*b00)*det;out[12]=(a11*b07-a10*b09-a12*b06)*det;out[13]=(a00*b09-a01*b07+a02*b06)*det;out[14]=(a31*b01-a30*b03-a32*b00)*det;out[15]=(a20*b03-a21*b01+a22*b00)*det;return out};mat4.adjoint=function(out,a){var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15];out[0]=a11*(a22*a33-a23*a32)-a21*(a12*a33-a13*a32)+a31*(a12*a23-a13*a22);out[1]=-(a01*(a22*a33-a23*a32)-a21*(a02*a33-a03*a32)+a31*(a02*a23-a03*a22));out[2]=a01*(a12*a33-a13*a32)-a11*(a02*a33-a03*a32)+a31*(a02*a13-a03*a12);out[3]=-(a01*(a12*a23-a13*a22)-a11*(a02*a23-a03*a22)+a21*(a02*a13-a03*a12));out[4]=-(a10*(a22*a33-a23*a32)-a20*(a12*a33-a13*a32)+a30*(a12*a23-a13*a22));out[5]=a00*(a22*a33-a23*a32)-a20*(a02*a33-a03*a32)+a30*(a02*a23-a03*a22);out[6]=-(a00*(a12*a33-a13*a32)-a10*(a02*a33-a03*a32)+a30*(a02*a13-a03*a12));out[7]=a00*(a12*a23-a13*a22)-a10*(a02*a23-a03*a22)+a20*(a02*a13-a03*a12);out[8]=a10*(a21*a33-a23*a31)-a20*(a11*a33-a13*a31)+a30*(a11*a23-a13*a21);out[9]=-(a00*(a21*a33-a23*a31)-a20*(a01*a33-a03*a31)+a30*(a01*a23-a03*a21));out[10]=a00*(a11*a33-a13*a31)-a10*(a01*a33-a03*a31)+a30*(a01*a13-a03*a11);out[11]=-(a00*(a11*a23-a13*a21)-a10*(a01*a23-a03*a21)+a20*(a01*a13-a03*a11));out[12]=-(a10*(a21*a32-a22*a31)-a20*(a11*a32-a12*a31)+a30*(a11*a22-a12*a21));out[13]=a00*(a21*a32-a22*a31)-a20*(a01*a32-a02*a31)+a30*(a01*a22-a02*a21);out[14]=-(a00*(a11*a32-a12*a31)-a10*(a01*a32-a02*a31)+a30*(a01*a12-a02*a11));out[15]=a00*(a11*a22-a12*a21)-a10*(a01*a22-a02*a21)+a20*(a01*a12-a02*a11);return out};mat4.determinant=function(a){var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15],b00=a00*a11-a01*a10,b01=a00*a12-a02*a10,b02=a00*a13-a03*a10,b03=a01*a12-a02*a11,b04=a01*a13-a03*a11,b05=a02*a13-a03*a12,b06=a20*a31-a21*a30,b07=a20*a32-a22*a30,b08=a20*a33-a23*a30,b09=a21*a32-a22*a31,b10=a21*a33-a23*a31,b11=a22*a33-a23*a32;return b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06};mat4.mul=mat4.multiply=function(out,a,b){var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15];var b0=b[0],b1=b[1],b2=b[2],b3=b[3];out[0]=b0*a00+b1*a10+b2*a20+b3*a30;out[1]=b0*a01+b1*a11+b2*a21+b3*a31;out[2]=b0*a02+b1*a12+b2*a22+b3*a32;out[3]=b0*a03+b1*a13+b2*a23+b3*a33;b0=b[4];b1=b[5];b2=b[6];b3=b[7];out[4]=b0*a00+b1*a10+b2*a20+b3*a30;out[5]=b0*a01+b1*a11+b2*a21+b3*a31;out[6]=b0*a02+b1*a12+b2*a22+b3*a32;out[7]=b0*a03+b1*a13+b2*a23+b3*a33;b0=b[8];b1=b[9];b2=b[10];b3=b[11];out[8]=b0*a00+b1*a10+b2*a20+b3*a30;out[9]=b0*a01+b1*a11+b2*a21+b3*a31;out[10]=b0*a02+b1*a12+b2*a22+b3*a32;out[11]=b0*a03+b1*a13+b2*a23+b3*a33;b0=b[12];b1=b[13];b2=b[14];b3=b[15];out[12]=b0*a00+b1*a10+b2*a20+b3*a30;out[13]=b0*a01+b1*a11+b2*a21+b3*a31;out[14]=b0*a02+b1*a12+b2*a22+b3*a32;out[15]=b0*a03+b1*a13+b2*a23+b3*a33;return out};mat4.translate=function(out,a,v){var x=v[0],y=v[1],z=v[2],a00,a01,a02,a03,a10,a11,a12,a13,a20,a21,a22,a23;if(a===out){out[12]=a[0]*x+a[4]*y+a[8]*z+a[12];out[13]=a[1]*x+a[5]*y+a[9]*z+a[13];out[14]=a[2]*x+a[6]*y+a[10]*z+a[14];out[15]=a[3]*x+a[7]*y+a[11]*z+a[15]}else{a00=a[0];a01=a[1];a02=a[2];a03=a[3];a10=a[4];a11=a[5];a12=a[6];a13=a[7];a20=a[8];a21=a[9];a22=a[10];a23=a[11];out[0]=a00;out[1]=a01;out[2]=a02;out[3]=a03;out[4]=a10;out[5]=a11;out[6]=a12;out[7]=a13;out[8]=a20;out[9]=a21;out[10]=a22;out[11]=a23;out[12]=a00*x+a10*y+a20*z+a[12];out[13]=a01*x+a11*y+a21*z+a[13];out[14]=a02*x+a12*y+a22*z+a[14];out[15]=a03*x+a13*y+a23*z+a[15]}return out};mat4.scale=function(out,a,v){var x=v[0],y=v[1],z=v[2];out[0]=a[0]*x;out[1]=a[1]*x;out[2]=a[2]*x;out[3]=a[3]*x;out[4]=a[4]*y;out[5]=a[5]*y;out[6]=a[6]*y;out[7]=a[7]*y;out[8]=a[8]*z;out[9]=a[9]*z;out[10]=a[10]*z;out[11]=a[11]*z;out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];return out};mat4.rotate=function(out,a,rad,axis){var x=axis[0],y=axis[1],z=axis[2],len=Math.sqrt(x*x+y*y+z*z),s,c,t,a00,a01,a02,a03,a10,a11,a12,a13,a20,a21,a22,a23,b00,b01,b02,b10,b11,b12,b20,b21,b22;if(Math.abs(len)<GLMAT_EPSILON){return null}len=1/len;x*=len;y*=len;z*=len;s=Math.sin(rad);c=Math.cos(rad);t=1-c;a00=a[0];a01=a[1];a02=a[2];a03=a[3];a10=a[4];a11=a[5];a12=a[6];a13=a[7];a20=a[8];a21=a[9];a22=a[10];a23=a[11];b00=x*x*t+c;b01=y*x*t+z*s;b02=z*x*t-y*s;b10=x*y*t-z*s;b11=y*y*t+c;b12=z*y*t+x*s;b20=x*z*t+y*s;b21=y*z*t-x*s;b22=z*z*t+c;out[0]=a00*b00+a10*b01+a20*b02;out[1]=a01*b00+a11*b01+a21*b02;out[2]=a02*b00+a12*b01+a22*b02;out[3]=a03*b00+a13*b01+a23*b02;out[4]=a00*b10+a10*b11+a20*b12;out[5]=a01*b10+a11*b11+a21*b12;out[6]=a02*b10+a12*b11+a22*b12;out[7]=a03*b10+a13*b11+a23*b12;out[8]=a00*b20+a10*b21+a20*b22;out[9]=a01*b20+a11*b21+a21*b22;out[10]=a02*b20+a12*b21+a22*b22;out[11]=a03*b20+a13*b21+a23*b22;if(a!==out){out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15]}return out};mat4.rotateX=function(out,a,rad){var s=Math.sin(rad),c=Math.cos(rad),a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11];if(a!==out){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15]}out[4]=a10*c+a20*s;out[5]=a11*c+a21*s;out[6]=a12*c+a22*s;out[7]=a13*c+a23*s;out[8]=a20*c-a10*s;out[9]=a21*c-a11*s;out[10]=a22*c-a12*s;out[11]=a23*c-a13*s;return out};mat4.rotateY=function(out,a,rad){var s=Math.sin(rad),c=Math.cos(rad),a00=a[0],a01=a[1],a02=a[2],a03=a[3],a20=a[8],a21=a[9],a22=a[10],a23=a[11];if(a!==out){out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15]}out[0]=a00*c-a20*s;out[1]=a01*c-a21*s;out[2]=a02*c-a22*s;out[3]=a03*c-a23*s;out[8]=a00*s+a20*c;out[9]=a01*s+a21*c;out[10]=a02*s+a22*c;out[11]=a03*s+a23*c;return out};mat4.rotateZ=function(out,a,rad){var s=Math.sin(rad),c=Math.cos(rad),a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7];if(a!==out){out[8]=a[8];out[9]=a[9];out[10]=a[10];out[11]=a[11];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15]}out[0]=a00*c+a10*s;out[1]=a01*c+a11*s;out[2]=a02*c+a12*s;out[3]=a03*c+a13*s;out[4]=a10*c-a00*s;out[5]=a11*c-a01*s;out[6]=a12*c-a02*s;out[7]=a13*c-a03*s;return out};mat4.fromRotationTranslation=function(out,q,v){var x=q[0],y=q[1],z=q[2],w=q[3],x2=x+x,y2=y+y,z2=z+z,xx=x*x2,xy=x*y2,xz=x*z2,yy=y*y2,yz=y*z2,zz=z*z2,wx=w*x2,wy=w*y2,wz=w*z2;out[0]=1-(yy+zz);out[1]=xy+wz;out[2]=xz-wy;out[3]=0;out[4]=xy-wz;out[5]=1-(xx+zz);out[6]=yz+wx;out[7]=0;out[8]=xz+wy;out[9]=yz-wx;out[10]=1-(xx+yy);out[11]=0;out[12]=v[0];out[13]=v[1];out[14]=v[2];out[15]=1;return out};mat4.frustum=function(out,left,right,bottom,top,near,far){var rl=1/(right-left),tb=1/(top-bottom),nf=1/(near-far);out[0]=near*2*rl;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=near*2*tb;out[6]=0;out[7]=0;out[8]=(right+left)*rl;out[9]=(top+bottom)*tb;out[10]=(far+near)*nf;out[11]=-1;out[12]=0;out[13]=0;out[14]=far*near*2*nf;out[15]=0;return out};mat4.perspective=function(out,fovy,aspect,near,far){var f=1/Math.tan(fovy/2),nf=1/(near-far);out[0]=f/aspect;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=f;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=(far+near)*nf;out[11]=-1;out[12]=0;out[13]=0;out[14]=2*far*near*nf;out[15]=0;return out};mat4.ortho=function(out,left,right,bottom,top,near,far){var lr=1/(left-right),bt=1/(bottom-top),nf=1/(near-far);out[0]=-2*lr;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=-2*bt;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=2*nf;out[11]=0;out[12]=(left+right)*lr;out[13]=(top+bottom)*bt;out[14]=(far+near)*nf;out[15]=1;return out};mat4.lookAt=function(out,eye,center,up){var x0,x1,x2,y0,y1,y2,z0,z1,z2,len,eyex=eye[0],eyey=eye[1],eyez=eye[2],upx=up[0],upy=up[1],upz=up[2],centerx=center[0],centery=center[1],centerz=center[2];if(Math.abs(eyex-centerx)<GLMAT_EPSILON&&Math.abs(eyey-centery)<GLMAT_EPSILON&&Math.abs(eyez-centerz)<GLMAT_EPSILON){return mat4.identity(out)}z0=eyex-centerx;z1=eyey-centery;z2=eyez-centerz;len=1/Math.sqrt(z0*z0+z1*z1+z2*z2);z0*=len;z1*=len;z2*=len;x0=upy*z2-upz*z1;x1=upz*z0-upx*z2;x2=upx*z1-upy*z0;len=Math.sqrt(x0*x0+x1*x1+x2*x2);if(!len){x0=0;x1=0;x2=0}else{len=1/len;x0*=len;x1*=len;x2*=len}y0=z1*x2-z2*x1;y1=z2*x0-z0*x2;y2=z0*x1-z1*x0;len=Math.sqrt(y0*y0+y1*y1+y2*y2);if(!len){y0=0;y1=0;y2=0}else{len=1/len;y0*=len;y1*=len;y2*=len}out[0]=x0;out[1]=y0;out[2]=z0;out[3]=0;out[4]=x1;out[5]=y1;out[6]=z1;out[7]=0;out[8]=x2;out[9]=y2;out[10]=z2;out[11]=0;out[12]=-(x0*eyex+x1*eyey+x2*eyez);out[13]=-(y0*eyex+y1*eyey+y2*eyez);out[14]=-(z0*eyex+z1*eyey+z2*eyez);out[15]=1;
return out};mat4.str=function(a){return"mat4("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+")"};if(typeof exports!=="undefined"){exports.mat4=mat4}var quat={};var quatIdentity=new Float32Array([0,0,0,1]);if(!GLMAT_EPSILON){var GLMAT_EPSILON=1e-6}quat.create=function(){return new Float32Array(quatIdentity)};quat.clone=vec4.clone;quat.fromValues=vec4.fromValues;quat.copy=vec4.copy;quat.set=vec4.set;quat.identity=function(out){out[0]=0;out[1]=0;out[2]=0;out[3]=1;return out};quat.setAxisAngle=function(out,axis,rad){rad=rad*.5;var s=Math.sin(rad);out[0]=s*axis[0];out[1]=s*axis[1];out[2]=s*axis[2];out[3]=Math.cos(rad);return out};quat.add=vec4.add;quat.mul=quat.multiply=function(out,a,b){var ax=a[0],ay=a[1],az=a[2],aw=a[3],bx=b[0],by=b[1],bz=b[2],bw=b[3];out[0]=ax*bw+aw*bx+ay*bz-az*by;out[1]=ay*bw+aw*by+az*bx-ax*bz;out[2]=az*bw+aw*bz+ax*by-ay*bx;out[3]=aw*bw-ax*bx-ay*by-az*bz;return out};quat.scale=vec4.scale;quat.rotateX=function(out,a,rad){rad*=.5;var ax=a[0],ay=a[1],az=a[2],aw=a[3],bx=Math.sin(rad),bw=Math.cos(rad);out[0]=ax*bw+aw*bx;out[1]=ay*bw+az*bx;out[2]=az*bw-ay*bx;out[3]=aw*bw-ax*bx;return out};quat.rotateY=function(out,a,rad){rad*=.5;var ax=a[0],ay=a[1],az=a[2],aw=a[3],by=Math.sin(rad),bw=Math.cos(rad);out[0]=ax*bw-az*by;out[1]=ay*bw+aw*by;out[2]=az*bw+ax*by;out[3]=aw*bw-ay*by;return out};quat.rotateZ=function(out,a,rad){rad*=.5;var ax=a[0],ay=a[1],az=a[2],aw=a[3],bz=Math.sin(rad),bw=Math.cos(rad);out[0]=ax*bw+ay*bz;out[1]=ay*bw-ax*bz;out[2]=az*bw+aw*bz;out[3]=aw*bw-az*bz;return out};quat.calculateW=function(out,a){var x=a[0],y=a[1],z=a[2];out[0]=x;out[1]=y;out[2]=z;out[3]=-Math.sqrt(Math.abs(1-x*x-y*y-z*z));return out};quat.dot=vec4.dot;quat.lerp=vec4.lerp;quat.slerp=function(out,a,b,t){var ax=a[0],ay=a[1],az=a[2],aw=a[3],bx=b[0],by=b[1],bz=b[2],bw=a[3];var cosHalfTheta=ax*bx+ay*by+az*bz+aw*bw,halfTheta,sinHalfTheta,ratioA,ratioB;if(Math.abs(cosHalfTheta)>=1){if(out!==a){out[0]=ax;out[1]=ay;out[2]=az;out[3]=aw}return out}halfTheta=Math.acos(cosHalfTheta);sinHalfTheta=Math.sqrt(1-cosHalfTheta*cosHalfTheta);if(Math.abs(sinHalfTheta)<.001){out[0]=ax*.5+bx*.5;out[1]=ay*.5+by*.5;out[2]=az*.5+bz*.5;out[3]=aw*.5+bw*.5;return out}ratioA=Math.sin((1-t)*halfTheta)/sinHalfTheta;ratioB=Math.sin(t*halfTheta)/sinHalfTheta;out[0]=ax*ratioA+bx*ratioB;out[1]=ay*ratioA+by*ratioB;out[2]=az*ratioA+bz*ratioB;out[3]=aw*ratioA+bw*ratioB;return out};quat.invert=function(out,a){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],dot=a0*a0+a1*a1+a2*a2+a3*a3,invDot=dot?1/dot:0;out[0]=-a0*invDot;out[1]=-a1*invDot;out[2]=-a2*invDot;out[3]=a3*invDot;return out};quat.conjugate=function(out,a){out[0]=-a[0];out[1]=-a[1];out[2]=-a[2];out[3]=a[3];return out};quat.len=quat.length=vec4.length;quat.sqrLen=quat.squaredLength=vec4.squaredLength;quat.normalize=vec4.normalize;quat.str=function(a){return"quat("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+")"};if(typeof exports!=="undefined"){exports.quat=quat}}(shim.exports)}()}()},{}],19:[function(require,module,exports){var Pipeline=module.exports=function(){this.steps=[]};Pipeline.prototype.addStep=function(step){this.steps.push(step)};Pipeline.prototype.run=function(frame){var stepsLength=this.steps.length;for(var i=0;i!=stepsLength;i++){if(!frame)break;frame=this.steps[i](frame)}return frame}},{}],17:[function(require,module,exports){var Cursor=module.exports=function(){return function(frame){var pointable=frame.pointables.sort(function(a,b){return a.z-b.z})[0];if(pointable&&pointable.valid){frame.cursorPosition=pointable.tipPosition}return frame}}},{}],8:[function(require,module,exports){!function(process){var Frame=require("./frame"),CircularBuffer=require("./circular_buffer"),Pipeline=require("./pipeline"),EventEmitter=require("events").EventEmitter,gestureListener=require("./gesture").gestureListener,_=require("underscore");var Controller=module.exports=function(opts){var inNode=typeof process!=="undefined"&&process.title==="node";opts=_.defaults(opts||{},{inNode:inNode});this.inNode=opts.inNode;opts=_.defaults(opts||{},{frameEventName:this.useAnimationLoop()?"animationFrame":"deviceFrame",supressAnimationLoop:false});this.supressAnimationLoop=opts.supressAnimationLoop;this.frameEventName=opts.frameEventName;this.history=new CircularBuffer(200);this.lastFrame=Frame.Invalid;this.lastValidFrame=Frame.Invalid;this.lastConnectionFrame=Frame.Invalid;this.accumulatedGestures=[];if(opts.connectionType===undefined){this.connectionType=this.inBrowser()?require("./connection"):require("./node_connection")}else{this.connectionType=opts.connectionType}this.connection=new this.connectionType(opts);this.setupConnectionEvents()};Controller.prototype.gesture=function(type,cb){var creator=gestureListener(this,type);if(cb!==undefined){creator.stop(cb)}return creator};Controller.prototype.inBrowser=function(){return!this.inNode};Controller.prototype.useAnimationLoop=function(){return this.inBrowser()&&typeof chrome==="undefined"};Controller.prototype.connect=function(){var controller=this;if(this.connection.connect()&&this.inBrowser()&&!controller.supressAnimationLoop){var callback=function(){controller.emit("animationFrame",controller.lastConnectionFrame);window.requestAnimFrame(callback)};window.requestAnimFrame(callback)}};Controller.prototype.disconnect=function(){this.connection.disconnect()};Controller.prototype.frame=function(num){return this.history.get(num)||Frame.Invalid};Controller.prototype.loop=function(callback){switch(callback.length){case 1:this.on(this.frameEventName,callback);break;case 2:var controller=this;var scheduler=null;var immediateRunnerCallback=function(frame){callback(frame,function(){if(controller.lastFrame!=frame){immediateRunnerCallback(controller.lastFrame)}else{controller.once(controller.frameEventName,immediateRunnerCallback)}})};this.once(this.frameEventName,immediateRunnerCallback);break}this.connect()};Controller.prototype.addStep=function(step){if(!this.pipeline)this.pipeline=new Pipeline(this);this.pipeline.addStep(step)};Controller.prototype.processFrame=function(frame){if(frame.gestures){this.accumulatedGestures=this.accumulatedGestures.concat(frame.gestures)}if(this.pipeline){frame=this.pipeline.run(frame);if(!frame)frame=Frame.Invalid}this.lastConnectionFrame=frame;this.emit("deviceFrame",frame)};Controller.prototype.processFinishedFrame=function(frame){this.lastFrame=frame;if(frame.valid){this.lastValidFrame=frame}frame.controller=this;frame.historyIdx=this.history.push(frame);if(frame.gestures){frame.gestures=this.accumulatedGestures;this.accumulatedGestures=[];for(var gestureIdx=0;gestureIdx!=frame.gestures.length;gestureIdx++){this.emit("gesture",frame.gestures[gestureIdx],frame)}}this.emit("frame",frame)};Controller.prototype.setupConnectionEvents=function(){var controller=this;this.connection.on("frame",function(frame){controller.processFrame(frame)});this.on(this.frameEventName,function(frame){controller.processFinishedFrame(frame)});this.connection.on("disconnect",function(){controller.emit("disconnect")});this.connection.on("ready",function(){controller.emit("ready")});this.connection.on("connect",function(){controller.emit("connect")});this.connection.on("focus",function(){controller.emit("focus")});this.connection.on("blur",function(){controller.emit("blur")});this.connection.on("protocol",function(protocol){controller.emit("protocol",protocol)});this.connection.on("deviceConnect",function(evt){controller.emit(evt.state?"deviceConnected":"deviceDisconnected")})};_.extend(Controller.prototype,EventEmitter.prototype)}(require("__browserify_process"))},{"./circular_buffer":3,"./connection":7,"./frame":9,"./gesture":10,"./node_connection":4,"./pipeline":19,__browserify_process:5,events:6,underscore:20}],10:[function(require,module,exports){var glMatrix=require("gl-matrix"),vec3=glMatrix.vec3,EventEmitter=require("events").EventEmitter,_=require("underscore");var createGesture=exports.createGesture=function(data){var gesture;switch(data.type){case"circle":gesture=new CircleGesture(data);break;case"swipe":gesture=new SwipeGesture(data);break;case"screenTap":gesture=new ScreenTapGesture(data);break;case"keyTap":gesture=new KeyTapGesture(data);break;default:throw"unkown gesture type"}gesture.id=data.id;gesture.handIds=data.handIds;gesture.pointableIds=data.pointableIds;gesture.duration=data.duration;gesture.state=data.state;gesture.type=data.type;return gesture};var gestureListener=exports.gestureListener=function(controller,type){var handlers={};var gestureMap={};var gestureCreator=function(){var candidateGesture=gestureMap[gesture.id];if(candidateGesture!==undefined)gesture.update(gesture,frame);if(gesture.state=="start"||gesture.state=="stop"){if(type==gesture.type&&gestureMap[gesture.id]===undefined){gestureMap[gesture.id]=new Gesture(gesture,frame);gesture.update(gesture,frame)}if(gesture.state=="stop"){delete gestureMap[gesture.id]}}};controller.on("gesture",function(gesture,frame){if(gesture.type==type){if(gesture.state=="start"||gesture.state=="stop"){if(gestureMap[gesture.id]===undefined){var gestureTracker=new Gesture(gesture,frame);gestureMap[gesture.id]=gestureTracker;_.each(handlers,function(cb,name){gestureTracker.on(name,cb)})}}gestureMap[gesture.id].update(gesture,frame);if(gesture.state=="stop"){delete gestureMap[gesture.id]}}});var builder={start:function(cb){handlers["start"]=cb;return builder},stop:function(cb){handlers["stop"]=cb;return builder},complete:function(cb){handlers["stop"]=cb;return builder},update:function(cb){handlers["update"]=cb;return builder}};return builder};var Gesture=exports.Gesture=function(gesture,frame){this.gestures=[gesture];this.frames=[frame]};Gesture.prototype.update=function(gesture,frame){this.gestures.push(gesture);this.frames.push(frame);this.emit(gesture.state,this)};_.extend(Gesture.prototype,EventEmitter.prototype);var CircleGesture=function(data){this.center=data.center;this.normal=data.normal;this.progress=data.progress;this.radius=data.radius};CircleGesture.prototype.toString=function(){return"CircleGesture ["+JSON.stringify(this)+"]"};var SwipeGesture=function(data){this.startPosition=data.startPosition;this.position=data.position;this.direction=data.direction;this.speed=data.speed};SwipeGesture.prototype.toString=function(){return"SwipeGesture ["+JSON.stringify(this)+"]"};var ScreenTapGesture=function(data){this.position=data.position;this.direction=data.direction;this.progress=data.progress};ScreenTapGesture.prototype.toString=function(){return"ScreenTapGesture ["+JSON.stringify(this)+"]"};var KeyTapGesture=function(data){this.position=data.position;this.direction=data.direction;this.progress=data.progress};KeyTapGesture.prototype.toString=function(){return"KeyTapGesture ["+JSON.stringify(this)+"]"}},{events:6,"gl-matrix":15,underscore:20}],11:[function(require,module,exports){var Pointable=require("./pointable"),glMatrix=require("gl-matrix"),mat3=glMatrix.mat3,vec3=glMatrix.vec3,_=require("underscore");var Hand=module.exports=function(data){this.id=data.id;this.palmPosition=data.palmPosition;this.direction=data.direction;this.palmVelocity=data.palmVelocity;this.palmNormal=data.palmNormal;this.sphereCenter=data.sphereCenter;this.sphereRadius=data.sphereRadius;this.valid=true;this.pointables=[];this.fingers=[];this.tools=[];this._translation=data.t;this._rotation=_.flatten(data.r);this._scaleFactor=data.s;this.timeVisible=data.timeVisible;this.stabilizedPalmPosition=data.stabilizedPalmPosition};Hand.prototype.finger=function(id){var finger=this.frame.finger(id);return finger&&finger.handId==this.id?finger:Pointable.Invalid};Hand.prototype.rotationAngle=function(sinceFrame,axis){if(!this.valid||!sinceFrame.valid)return 0;var sinceHand=sinceFrame.hand(this.id);if(!sinceHand.valid)return 0;var rot=this.rotationMatrix(sinceFrame);var cs=(rot[0]+rot[4]+rot[8]-1)*.5;var angle=Math.acos(cs);angle=isNaN(angle)?0:angle;if(axis!==undefined){var rotAxis=this.rotationAxis(sinceFrame);angle*=vec3.dot(rotAxis,vec3.normalize(vec3.create(),axis))}return angle};Hand.prototype.rotationAxis=function(sinceFrame){if(!this.valid||!sinceFrame.valid)return vec3.create();var sinceHand=sinceFrame.hand(this.id);if(!sinceHand.valid)return vec3.create();return vec3.normalize(vec3.create(),[this._rotation[7]-sinceHand._rotation[5],this._rotation[2]-sinceHand._rotation[6],this._rotation[3]-sinceHand._rotation[1]])};Hand.prototype.rotationMatrix=function(sinceFrame){if(!this.valid||!sinceFrame.valid)return mat3.create();var sinceHand=sinceFrame.hand(this.id);if(!sinceHand.valid)return mat3.create();var transpose=mat3.transpose(mat3.create(),this._rotation);var m=mat3.multiply(mat3.create(),sinceHand._rotation,transpose);return m};Hand.prototype.scaleFactor=function(sinceFrame){if(!this.valid||!sinceFrame.valid)return 1;var sinceHand=sinceFrame.hand(this.id);if(!sinceHand.valid)return 1;return Math.exp(this._scaleFactor-sinceHand._scaleFactor)};Hand.prototype.translation=function(sinceFrame){if(!this.valid||!sinceFrame.valid)return vec3.create();var sinceHand=sinceFrame.hand(this.id);if(!sinceHand.valid)return vec3.create();return[this._translation[0]-sinceHand._translation[0],this._translation[1]-sinceHand._translation[1],this._translation[2]-sinceHand._translation[2]]};Hand.prototype.toString=function(){return"Hand [ id: "+this.id+" | palm velocity:"+this.palmVelocity+" | sphere center:"+this.sphereCenter+" ] "};Hand.Invalid={valid:false,fingers:[],tools:[],pointables:[],pointable:function(){return Pointable.Invalid},finger:function(){return Pointable.Invalid},toString:function(){return"invalid frame"},dump:function(){return this.toString()},rotationAngle:function(){return 0},rotationMatrix:function(){return mat3.create()},rotationAxis:function(){return vec3.create()},scaleFactor:function(){return 1},translation:function(){return vec3.create()}}},{"./pointable":13,"gl-matrix":15,underscore:20}],9:[function(require,module,exports){var Hand=require("./hand"),Pointable=require("./pointable"),createGesture=require("./gesture").createGesture,glMatrix=require("gl-matrix"),mat3=glMatrix.mat3,vec3=glMatrix.vec3,InteractionBox=require("./interaction_box"),_=require("underscore");var Frame=module.exports=function(data){this.valid=true;this.id=data.id;this.timestamp=data.timestamp;this.hands=[];this.handsMap={};this.pointables=[];this.tools=[];this.fingers=[];if(data.interactionBox){this.interactionBox=new InteractionBox(data.interactionBox)}this.gestures=[];this.pointablesMap={};this._translation=data.t;this._rotation=_.flatten(data.r);this._scaleFactor=data.s;this.data=data;this.type="frame";this.currentFrameRate=data.currentFrameRate;var handMap={};for(var handIdx=0,handCount=data.hands.length;handIdx!=handCount;handIdx++){var hand=new Hand(data.hands[handIdx]);hand.frame=this;this.hands.push(hand);this.handsMap[hand.id]=hand;handMap[hand.id]=handIdx}for(var pointableIdx=0,pointableCount=data.pointables.length;pointableIdx!=pointableCount;pointableIdx++){var pointable=new Pointable(data.pointables[pointableIdx]);pointable.frame=this;this.pointables.push(pointable);this.pointablesMap[pointable.id]=pointable;(pointable.tool?this.tools:this.fingers).push(pointable);if(pointable.handId!==undefined&&handMap.hasOwnProperty(pointable.handId)){var hand=this.hands[handMap[pointable.handId]];hand.pointables.push(pointable);(pointable.tool?hand.tools:hand.fingers).push(pointable)}}if(data.gestures){for(var gestureIdx=0,gestureCount=data.gestures.length;gestureIdx!=gestureCount;gestureIdx++){this.gestures.push(createGesture(data.gestures[gestureIdx]))}}};Frame.prototype.tool=function(id){var pointable=this.pointable(id);return pointable.tool?pointable:Pointable.Invalid};Frame.prototype.pointable=function(id){return this.pointablesMap[id]||Pointable.Invalid};Frame.prototype.finger=function(id){var pointable=this.pointable(id);return!pointable.tool?pointable:Pointable.Invalid};Frame.prototype.hand=function(id){return this.handsMap[id]||Hand.Invalid};Frame.prototype.rotationAngle=function(sinceFrame,axis){if(!this.valid||!sinceFrame.valid)return 0;var rot=this.rotationMatrix(sinceFrame);var cs=(rot[0]+rot[4]+rot[8]-1)*.5;var angle=Math.acos(cs);angle=isNaN(angle)?0:angle;if(axis!==undefined){var rotAxis=this.rotationAxis(sinceFrame);angle*=vec3.dot(rotAxis,vec3.normalize(vec3.create(),axis))}return angle};Frame.prototype.rotationAxis=function(sinceFrame){if(!this.valid||!sinceFrame.valid)return vec3.create();return vec3.normalize(vec3.create(),[this._rotation[7]-sinceFrame._rotation[5],this._rotation[2]-sinceFrame._rotation[6],this._rotation[3]-sinceFrame._rotation[1]])};Frame.prototype.rotationMatrix=function(sinceFrame){if(!this.valid||!sinceFrame.valid)return mat3.create();var transpose=mat3.transpose(mat3.create(),this._rotation);return mat3.multiply(mat3.create(),sinceFrame._rotation,transpose)};Frame.prototype.scaleFactor=function(sinceFrame){if(!this.valid||!sinceFrame.valid)return 1;return Math.exp(this._scaleFactor-sinceFrame._scaleFactor)};Frame.prototype.translation=function(sinceFrame){if(!this.valid||!sinceFrame.valid)return vec3.create();return vec3.subtract(vec3.create(),this._translation,sinceFrame._translation)};Frame.prototype.toString=function(){var str="Frame [ id:"+this.id+" | timestamp:"+this.timestamp+" | Hand count:("+this.hands.length+") | Pointable count:("+this.pointables.length+")";if(this.gestures)str+=" | Gesture count:("+this.gestures.length+")";str+=" ]";return str};Frame.prototype.dump=function(){var out="";out+="Frame Info:<br/>";out+=this.toString();out+="<br/><br/>Hands:<br/>";for(var handIdx=0,handCount=this.hands.length;handIdx!=handCount;handIdx++){out+="  "+this.hands[handIdx].toString()+"<br/>"}out+="<br/><br/>Pointables:<br/>";for(var pointableIdx=0,pointableCount=this.pointables.length;pointableIdx!=pointableCount;pointableIdx++){out+="  "+this.pointables[pointableIdx].toString()+"<br/>"}if(this.gestures){out+="<br/><br/>Gestures:<br/>";for(var gestureIdx=0,gestureCount=this.gestures.length;gestureIdx!=gestureCount;gestureIdx++){out+="  "+this.gestures[gestureIdx].toString()+"<br/>"}}out+="<br/><br/>Raw JSON:<br/>";out+=JSON.stringify(this.data);return out};Frame.Invalid={valid:false,hands:[],fingers:[],tools:[],gestures:[],pointables:[],pointable:function(){return Pointable.Invalid},finger:function(){return Pointable.Invalid},hand:function(){return Hand.Invalid},toString:function(){return"invalid frame"},dump:function(){return this.toString()},rotationAngle:function(){return 0},rotationMatrix:function(){return mat3.create()},rotationAxis:function(){return vec3.create()},scaleFactor:function(){return 1},translation:function(){return vec3.create()}}},{"./gesture":10,"./hand":11,"./interaction_box":12,"./pointable":13,"gl-matrix":15,underscore:20}],12:[function(require,module,exports){var glMatrix=require("gl-matrix"),vec3=glMatrix.vec3;var InteractionBox=module.exports=function(data){this.valid=true;this.center=data.center;this.size=data.size;this.width=data.size[0];this.height=data.size[1];this.depth=data.size[2]};InteractionBox.prototype.denormalizePoint=function(normalizedPosition){return vec3.fromValues((normalizedPosition[0]-.5)*this.size[0]+this.center[0],(normalizedPosition[1]-.5)*this.size[1]+this.center[1],(normalizedPosition[2]-.5)*this.size[2]+this.center[2])};InteractionBox.prototype.normalizePoint=function(position,clamp){var vec=vec3.fromValues((position[0]-this.center[0])/this.size[0]+.5,(position[1]-this.center[1])/this.size[1]+.5,(position[2]-this.center[2])/this.size[2]+.5);if(clamp){vec[0]=Math.min(Math.max(vec[0],0),1);vec[1]=Math.min(Math.max(vec[1],0),1);vec[2]=Math.min(Math.max(vec[2],0),1)}return vec};InteractionBox.prototype.toString=function(){return"InteractionBox [ width:"+this.width+" | height:"+this.height+" | depth:"+this.depth+" ]"};InteractionBox.Invalid={valid:false}},{"gl-matrix":15}],13:[function(require,module,exports){var glMatrix=require("gl-matrix"),vec3=glMatrix.vec3;var Pointable=module.exports=function(data){this.valid=true;this.id=data.id;this.handId=data.handId;this.length=data.length;this.tool=data.tool;this.width=data.width;this.direction=data.direction;this.stabilizedTipPosition=data.stabilizedTipPosition;this.tipPosition=data.tipPosition;this.tipVelocity=data.tipVelocity;this.touchZone=data.touchZone;this.touchDistance=data.touchDistance;this.timeVisible=data.timeVisible};Pointable.prototype.toString=function(){if(this.tool==true){return"Pointable [ id:"+this.id+" "+this.length+"mmx | with:"+this.width+"mm | direction:"+this.direction+" ]"}else{return"Pointable [ id:"+this.id+" "+this.length+"mmx | direction: "+this.direction+" ]"}};Pointable.Invalid={valid:false}},{"gl-matrix":15}],20:[function(require,module,exports){!function(){!function(){var root=this;var previousUnderscore=root._;var breaker={};var ArrayProto=Array.prototype,ObjProto=Object.prototype,FuncProto=Function.prototype;var push=ArrayProto.push,slice=ArrayProto.slice,concat=ArrayProto.concat,toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty;var nativeForEach=ArrayProto.forEach,nativeMap=ArrayProto.map,nativeReduce=ArrayProto.reduce,nativeReduceRight=ArrayProto.reduceRight,nativeFilter=ArrayProto.filter,nativeEvery=ArrayProto.every,nativeSome=ArrayProto.some,nativeIndexOf=ArrayProto.indexOf,nativeLastIndexOf=ArrayProto.lastIndexOf,nativeIsArray=Array.isArray,nativeKeys=Object.keys,nativeBind=FuncProto.bind;var _=function(obj){if(obj instanceof _)return obj;if(!(this instanceof _))return new _(obj);this._wrapped=obj};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=_}exports._=_}else{root._=_}_.VERSION="1.4.4";var each=_.each=_.forEach=function(obj,iterator,context){if(obj==null)return;if(nativeForEach&&obj.forEach===nativeForEach){obj.forEach(iterator,context)}else if(obj.length===+obj.length){for(var i=0,l=obj.length;i<l;i++){if(iterator.call(context,obj[i],i,obj)===breaker)return}}else{for(var key in obj){if(_.has(obj,key)){if(iterator.call(context,obj[key],key,obj)===breaker)return}}}};_.map=_.collect=function(obj,iterator,context){var results=[];if(obj==null)return results;if(nativeMap&&obj.map===nativeMap)return obj.map(iterator,context);each(obj,function(value,index,list){results[results.length]=iterator.call(context,value,index,list)});return results};var reduceError="Reduce of empty array with no initial value";_.reduce=_.foldl=_.inject=function(obj,iterator,memo,context){var initial=arguments.length>2;if(obj==null)obj=[];if(nativeReduce&&obj.reduce===nativeReduce){if(context)iterator=_.bind(iterator,context);return initial?obj.reduce(iterator,memo):obj.reduce(iterator)}each(obj,function(value,index,list){if(!initial){memo=value;initial=true}else{memo=iterator.call(context,memo,value,index,list)}});if(!initial)throw new TypeError(reduceError);return memo};_.reduceRight=_.foldr=function(obj,iterator,memo,context){var initial=arguments.length>2;if(obj==null)obj=[];if(nativeReduceRight&&obj.reduceRight===nativeReduceRight){if(context)iterator=_.bind(iterator,context);return initial?obj.reduceRight(iterator,memo):obj.reduceRight(iterator)}var length=obj.length;if(length!==+length){var keys=_.keys(obj);length=keys.length}each(obj,function(value,index,list){index=keys?keys[--length]:--length;if(!initial){memo=obj[index];initial=true}else{memo=iterator.call(context,memo,obj[index],index,list)}});if(!initial)throw new TypeError(reduceError);return memo};_.find=_.detect=function(obj,iterator,context){var result;any(obj,function(value,index,list){if(iterator.call(context,value,index,list)){result=value;return true}});return result};_.filter=_.select=function(obj,iterator,context){var results=[];if(obj==null)return results;if(nativeFilter&&obj.filter===nativeFilter)return obj.filter(iterator,context);each(obj,function(value,index,list){if(iterator.call(context,value,index,list))results[results.length]=value});return results};_.reject=function(obj,iterator,context){return _.filter(obj,function(value,index,list){return!iterator.call(context,value,index,list)},context)};_.every=_.all=function(obj,iterator,context){iterator||(iterator=_.identity);var result=true;if(obj==null)return result;if(nativeEvery&&obj.every===nativeEvery)return obj.every(iterator,context);each(obj,function(value,index,list){if(!(result=result&&iterator.call(context,value,index,list)))return breaker});return!!result};var any=_.some=_.any=function(obj,iterator,context){iterator||(iterator=_.identity);var result=false;if(obj==null)return result;if(nativeSome&&obj.some===nativeSome)return obj.some(iterator,context);each(obj,function(value,index,list){if(result||(result=iterator.call(context,value,index,list)))return breaker});return!!result};_.contains=_.include=function(obj,target){if(obj==null)return false;if(nativeIndexOf&&obj.indexOf===nativeIndexOf)return obj.indexOf(target)!=-1;return any(obj,function(value){return value===target})};_.invoke=function(obj,method){var args=slice.call(arguments,2);var isFunc=_.isFunction(method);return _.map(obj,function(value){return(isFunc?method:value[method]).apply(value,args)})};_.pluck=function(obj,key){return _.map(obj,function(value){return value[key]})};_.where=function(obj,attrs,first){if(_.isEmpty(attrs))return first?null:[];return _[first?"find":"filter"](obj,function(value){for(var key in attrs){if(attrs[key]!==value[key])return false}return true})};_.findWhere=function(obj,attrs){return _.where(obj,attrs,true)};_.max=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0]&&obj.length<65535){return Math.max.apply(Math,obj)}if(!iterator&&_.isEmpty(obj))return-Infinity;var result={computed:-Infinity,value:-Infinity};each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed>=result.computed&&(result={value:value,computed:computed})});return result.value};_.min=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0]&&obj.length<65535){return Math.min.apply(Math,obj)}if(!iterator&&_.isEmpty(obj))return Infinity;var result={computed:Infinity,value:Infinity};each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed<result.computed&&(result={value:value,computed:computed})});return result.value};_.shuffle=function(obj){var rand;var index=0;var shuffled=[];each(obj,function(value){rand=_.random(index++);shuffled[index-1]=shuffled[rand];shuffled[rand]=value});return shuffled};var lookupIterator=function(value){return _.isFunction(value)?value:function(obj){return obj[value]}};_.sortBy=function(obj,value,context){var iterator=lookupIterator(value);return _.pluck(_.map(obj,function(value,index,list){return{value:value,index:index,criteria:iterator.call(context,value,index,list)}}).sort(function(left,right){var a=left.criteria;var b=right.criteria;if(a!==b){if(a>b||a===void 0)return 1;if(a<b||b===void 0)return-1}return left.index<right.index?-1:1}),"value")};var group=function(obj,value,context,behavior){var result={};var iterator=lookupIterator(value||_.identity);each(obj,function(value,index){var key=iterator.call(context,value,index,obj);behavior(result,key,value)});return result};_.groupBy=function(obj,value,context){return group(obj,value,context,function(result,key,value){(_.has(result,key)?result[key]:result[key]=[]).push(value)})};_.countBy=function(obj,value,context){return group(obj,value,context,function(result,key){if(!_.has(result,key))result[key]=0;result[key]++})};_.sortedIndex=function(array,obj,iterator,context){iterator=iterator==null?_.identity:lookupIterator(iterator);var value=iterator.call(context,obj);var low=0,high=array.length;while(low<high){var mid=low+high>>>1;iterator.call(context,array[mid])<value?low=mid+1:high=mid}return low};_.toArray=function(obj){if(!obj)return[];if(_.isArray(obj))return slice.call(obj);if(obj.length===+obj.length)return _.map(obj,_.identity);return _.values(obj)};_.size=function(obj){if(obj==null)return 0;return obj.length===+obj.length?obj.length:_.keys(obj).length};_.first=_.head=_.take=function(array,n,guard){if(array==null)return void 0;return n!=null&&!guard?slice.call(array,0,n):array[0]};_.initial=function(array,n,guard){return slice.call(array,0,array.length-(n==null||guard?1:n))};_.last=function(array,n,guard){if(array==null)return void 0;if(n!=null&&!guard){return slice.call(array,Math.max(array.length-n,0))}else{return array[array.length-1]}};_.rest=_.tail=_.drop=function(array,n,guard){return slice.call(array,n==null||guard?1:n)};_.compact=function(array){return _.filter(array,_.identity)};var flatten=function(input,shallow,output){each(input,function(value){if(_.isArray(value)){shallow?push.apply(output,value):flatten(value,shallow,output)}else{output.push(value)}});return output};_.flatten=function(array,shallow){return flatten(array,shallow,[])};_.without=function(array){return _.difference(array,slice.call(arguments,1))};_.uniq=_.unique=function(array,isSorted,iterator,context){if(_.isFunction(isSorted)){context=iterator;iterator=isSorted;isSorted=false}var initial=iterator?_.map(array,iterator,context):array;var results=[];var seen=[];each(initial,function(value,index){if(isSorted?!index||seen[seen.length-1]!==value:!_.contains(seen,value)){seen.push(value);results.push(array[index])}});return results};_.union=function(){return _.uniq(concat.apply(ArrayProto,arguments))};_.intersection=function(array){var rest=slice.call(arguments,1);return _.filter(_.uniq(array),function(item){return _.every(rest,function(other){return _.indexOf(other,item)>=0})})};_.difference=function(array){var rest=concat.apply(ArrayProto,slice.call(arguments,1));return _.filter(array,function(value){return!_.contains(rest,value)})};_.zip=function(){var args=slice.call(arguments);var length=_.max(_.pluck(args,"length"));var results=new Array(length);for(var i=0;i<length;i++){results[i]=_.pluck(args,""+i)}return results};_.object=function(list,values){if(list==null)return{};var result={};for(var i=0,l=list.length;i<l;i++){if(values){result[list[i]]=values[i]}else{result[list[i][0]]=list[i][1]}}return result};_.indexOf=function(array,item,isSorted){if(array==null)return-1;var i=0,l=array.length;if(isSorted){if(typeof isSorted=="number"){i=isSorted<0?Math.max(0,l+isSorted):isSorted}else{i=_.sortedIndex(array,item);return array[i]===item?i:-1}}if(nativeIndexOf&&array.indexOf===nativeIndexOf)return array.indexOf(item,isSorted);for(;i<l;i++)if(array[i]===item)return i;return-1};_.lastIndexOf=function(array,item,from){if(array==null)return-1;var hasIndex=from!=null;if(nativeLastIndexOf&&array.lastIndexOf===nativeLastIndexOf){return hasIndex?array.lastIndexOf(item,from):array.lastIndexOf(item)}var i=hasIndex?from:array.length;while(i--)if(array[i]===item)return i;return-1};_.range=function(start,stop,step){if(arguments.length<=1){stop=start||0;start=0}step=arguments[2]||1;var len=Math.max(Math.ceil((stop-start)/step),0);var idx=0;var range=new Array(len);while(idx<len){range[idx++]=start;start+=step}return range};_.bind=function(func,context){if(func.bind===nativeBind&&nativeBind)return nativeBind.apply(func,slice.call(arguments,1));var args=slice.call(arguments,2);return function(){return func.apply(context,args.concat(slice.call(arguments)))}};_.partial=function(func){var args=slice.call(arguments,1);return function(){return func.apply(this,args.concat(slice.call(arguments)))}};_.bindAll=function(obj){var funcs=slice.call(arguments,1);if(funcs.length===0)funcs=_.functions(obj);each(funcs,function(f){obj[f]=_.bind(obj[f],obj)});return obj};_.memoize=function(func,hasher){var memo={};hasher||(hasher=_.identity);return function(){var key=hasher.apply(this,arguments);return _.has(memo,key)?memo[key]:memo[key]=func.apply(this,arguments)}};_.delay=function(func,wait){var args=slice.call(arguments,2);return setTimeout(function(){return func.apply(null,args)},wait)};_.defer=function(func){return _.delay.apply(_,[func,1].concat(slice.call(arguments,1)))
};_.throttle=function(func,wait){var context,args,timeout,result;var previous=0;var later=function(){previous=new Date;timeout=null;result=func.apply(context,args)};return function(){var now=new Date;var remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0){clearTimeout(timeout);timeout=null;previous=now;result=func.apply(context,args)}else if(!timeout){timeout=setTimeout(later,remaining)}return result}};_.debounce=function(func,wait,immediate){var timeout,result;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate)result=func.apply(context,args)};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)result=func.apply(context,args);return result}};_.once=function(func){var ran=false,memo;return function(){if(ran)return memo;ran=true;memo=func.apply(this,arguments);func=null;return memo}};_.wrap=function(func,wrapper){return function(){var args=[func];push.apply(args,arguments);return wrapper.apply(this,args)}};_.compose=function(){var funcs=arguments;return function(){var args=arguments;for(var i=funcs.length-1;i>=0;i--){args=[funcs[i].apply(this,args)]}return args[0]}};_.after=function(times,func){if(times<=0)return func();return function(){if(--times<1){return func.apply(this,arguments)}}};_.keys=nativeKeys||function(obj){if(obj!==Object(obj))throw new TypeError("Invalid object");var keys=[];for(var key in obj)if(_.has(obj,key))keys[keys.length]=key;return keys};_.values=function(obj){var values=[];for(var key in obj)if(_.has(obj,key))values.push(obj[key]);return values};_.pairs=function(obj){var pairs=[];for(var key in obj)if(_.has(obj,key))pairs.push([key,obj[key]]);return pairs};_.invert=function(obj){var result={};for(var key in obj)if(_.has(obj,key))result[obj[key]]=key;return result};_.functions=_.methods=function(obj){var names=[];for(var key in obj){if(_.isFunction(obj[key]))names.push(key)}return names.sort()};_.extend=function(obj){each(slice.call(arguments,1),function(source){if(source){for(var prop in source){obj[prop]=source[prop]}}});return obj};_.pick=function(obj){var copy={};var keys=concat.apply(ArrayProto,slice.call(arguments,1));each(keys,function(key){if(key in obj)copy[key]=obj[key]});return copy};_.omit=function(obj){var copy={};var keys=concat.apply(ArrayProto,slice.call(arguments,1));for(var key in obj){if(!_.contains(keys,key))copy[key]=obj[key]}return copy};_.defaults=function(obj){each(slice.call(arguments,1),function(source){if(source){for(var prop in source){if(obj[prop]==null)obj[prop]=source[prop]}}});return obj};_.clone=function(obj){if(!_.isObject(obj))return obj;return _.isArray(obj)?obj.slice():_.extend({},obj)};_.tap=function(obj,interceptor){interceptor(obj);return obj};var eq=function(a,b,aStack,bStack){if(a===b)return a!==0||1/a==1/b;if(a==null||b==null)return a===b;if(a instanceof _)a=a._wrapped;if(b instanceof _)b=b._wrapped;var className=toString.call(a);if(className!=toString.call(b))return false;switch(className){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:a==0?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if(typeof a!="object"||typeof b!="object")return false;var length=aStack.length;while(length--){if(aStack[length]==a)return bStack[length]==b}aStack.push(a);bStack.push(b);var size=0,result=true;if(className=="[object Array]"){size=a.length;result=size==b.length;if(result){while(size--){if(!(result=eq(a[size],b[size],aStack,bStack)))break}}}else{var aCtor=a.constructor,bCtor=b.constructor;if(aCtor!==bCtor&&!(_.isFunction(aCtor)&&aCtor instanceof aCtor&&_.isFunction(bCtor)&&bCtor instanceof bCtor)){return false}for(var key in a){if(_.has(a,key)){size++;if(!(result=_.has(b,key)&&eq(a[key],b[key],aStack,bStack)))break}}if(result){for(key in b){if(_.has(b,key)&&!size--)break}result=!size}}aStack.pop();bStack.pop();return result};_.isEqual=function(a,b){return eq(a,b,[],[])};_.isEmpty=function(obj){if(obj==null)return true;if(_.isArray(obj)||_.isString(obj))return obj.length===0;for(var key in obj)if(_.has(obj,key))return false;return true};_.isElement=function(obj){return!!(obj&&obj.nodeType===1)};_.isArray=nativeIsArray||function(obj){return toString.call(obj)=="[object Array]"};_.isObject=function(obj){return obj===Object(obj)};each(["Arguments","Function","String","Number","Date","RegExp"],function(name){_["is"+name]=function(obj){return toString.call(obj)=="[object "+name+"]"}});if(!_.isArguments(arguments)){_.isArguments=function(obj){return!!(obj&&_.has(obj,"callee"))}}if(typeof/./!=="function"){_.isFunction=function(obj){return typeof obj==="function"}}_.isFinite=function(obj){return isFinite(obj)&&!isNaN(parseFloat(obj))};_.isNaN=function(obj){return _.isNumber(obj)&&obj!=+obj};_.isBoolean=function(obj){return obj===true||obj===false||toString.call(obj)=="[object Boolean]"};_.isNull=function(obj){return obj===null};_.isUndefined=function(obj){return obj===void 0};_.has=function(obj,key){return hasOwnProperty.call(obj,key)};_.noConflict=function(){root._=previousUnderscore;return this};_.identity=function(value){return value};_.times=function(n,iterator,context){var accum=Array(n);for(var i=0;i<n;i++)accum[i]=iterator.call(context,i);return accum};_.random=function(min,max){if(max==null){max=min;min=0}return min+Math.floor(Math.random()*(max-min+1))};var entityMap={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};entityMap.unescape=_.invert(entityMap.escape);var entityRegexes={escape:new RegExp("["+_.keys(entityMap.escape).join("")+"]","g"),unescape:new RegExp("("+_.keys(entityMap.unescape).join("|")+")","g")};_.each(["escape","unescape"],function(method){_[method]=function(string){if(string==null)return"";return(""+string).replace(entityRegexes[method],function(match){return entityMap[method][match]})}});_.result=function(object,property){if(object==null)return null;var value=object[property];return _.isFunction(value)?value.call(object):value};_.mixin=function(obj){each(_.functions(obj),function(name){var func=_[name]=obj[name];_.prototype[name]=function(){var args=[this._wrapped];push.apply(args,arguments);return result.call(this,func.apply(_,args))}})};var idCounter=0;_.uniqueId=function(prefix){var id=++idCounter+"";return prefix?prefix+id:id};_.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var noMatch=/(.)^/;var escapes={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"};var escaper=/\\|'|\r|\n|\t|\u2028|\u2029/g;_.template=function(text,data,settings){var render;settings=_.defaults({},settings,_.templateSettings);var matcher=new RegExp([(settings.escape||noMatch).source,(settings.interpolate||noMatch).source,(settings.evaluate||noMatch).source].join("|")+"|$","g");var index=0;var source="__p+='";text.replace(matcher,function(match,escape,interpolate,evaluate,offset){source+=text.slice(index,offset).replace(escaper,function(match){return"\\"+escapes[match]});if(escape){source+="'+\n((__t=("+escape+"))==null?'':_.escape(__t))+\n'"}if(interpolate){source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'"}if(evaluate){source+="';\n"+evaluate+"\n__p+='"}index=offset+match.length;return match});source+="';\n";if(!settings.variable)source="with(obj||{}){\n"+source+"}\n";source="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+source+"return __p;\n";try{render=new Function(settings.variable||"obj","_",source)}catch(e){e.source=source;throw e}if(data)return render(data,_);var template=function(data){return render.call(this,data,_)};template.source="function("+(settings.variable||"obj")+"){\n"+source+"}";return template};_.chain=function(obj){return _(obj).chain()};var result=function(obj){return this._chain?_(obj).chain():obj};_.mixin(_);each(["pop","push","reverse","shift","sort","splice","unshift"],function(name){var method=ArrayProto[name];_.prototype[name]=function(){var obj=this._wrapped;method.apply(obj,arguments);if((name=="shift"||name=="splice")&&obj.length===0)delete obj[0];return result.call(this,obj)}});each(["concat","join","slice"],function(name){var method=ArrayProto[name];_.prototype[name]=function(){return result.call(this,method.apply(this._wrapped,arguments))}});_.extend(_.prototype,{chain:function(){this._chain=true;return this},value:function(){return this._wrapped}})}.call(this)}()},{}],16:[function(require,module,exports){var chooseProtocol=require("./protocol").chooseProtocol,EventEmitter=require("events").EventEmitter,_=require("underscore");var BaseConnection=module.exports=function(opts){this.opts=_.defaults(opts||{},{host:"127.0.0.1",enableGestures:false,tryReconnectOnDisconnect:true,port:6437,enableHeartbeat:true,heartbeatInterval:100,requestProtocolVersion:3});this.host=opts.host;this.port=opts.port;this.on("ready",function(){this.enableGestures(this.opts.enableGestures);if(this.opts.enableHeartbeat)this.startHeartbeat()});this.on("disconnect",function(){if(this.opts.enableHeartbeat)this.stopHeartbeat()});this.heartbeatTimer=null};BaseConnection.prototype.getUrl=function(){return"ws://"+this.host+":"+this.port+"/v"+this.opts.requestProtocolVersion+".json"};BaseConnection.prototype.sendHeartbeat=function(){if(this.protocol){this.setHeartbeatState(true);this.protocol.sendHeartbeat(this)}};BaseConnection.prototype.handleOpen=function(){this.emit("connect")};BaseConnection.prototype.enableGestures=function(enabled){this.gesturesEnabled=enabled?true:false;this.send(this.protocol.encode({enableGestures:this.gesturesEnabled}))};BaseConnection.prototype.handleClose=function(){this.disconnect();if(this.opts.tryReconnectOnDisconnect)this.startReconnection()};BaseConnection.prototype.startReconnection=function(){var connection=this;setTimeout(function(){connection.connect()},1e3)};BaseConnection.prototype.disconnect=function(){if(!this.socket)return;this.socket.close();delete this.socket;delete this.protocol;this.emit("disconnect")};BaseConnection.prototype.handleData=function(data){var message=JSON.parse(data);var messageEvent;if(this.protocol===undefined){messageEvent=this.protocol=chooseProtocol(message);this.emit("ready")}else{messageEvent=this.protocol(message)}this.emit(messageEvent.type,messageEvent)};BaseConnection.prototype.connect=function(){if(this.socket)return;this.socket=this.setupSocket();return true};BaseConnection.prototype.send=function(data){this.socket.send(data)};BaseConnection.prototype.stopHeartbeat=function(){if(!this.heartbeatTimer)return;clearInterval(this.heartbeatTimer);delete this.heartbeatTimer;this.setHeartbeatState(false)};BaseConnection.prototype.setHeartbeatState=function(state){if(this.heartbeatState===state)return;this.heartbeatState=state;this.emit(this.heartbeatState?"focus":"blur")};_.extend(BaseConnection.prototype,EventEmitter.prototype)},{"./protocol":21,events:6,underscore:20}],21:[function(require,module,exports){var Frame=require("./frame");var Event=function(data){this.type=data.type;this.state=data.state};var chooseProtocol=exports.chooseProtocol=function(header){var protocol;switch(header.version){case 1:protocol=JSONProtocol(1,function(data){return new Frame(data)});break;case 2:protocol=JSONProtocol(2,function(data){return new Frame(data)});protocol.sendHeartbeat=function(connection){connection.send(protocol.encode({heartbeat:true}))};break;case 3:protocol=JSONProtocol(3,function(data){return data.event?new Event(data.event):new Frame(data)});protocol.sendHeartbeat=function(connection){connection.send(protocol.encode({heartbeat:true}))};break;default:throw"unrecognized version"}return protocol};var JSONProtocol=function(version,cb){var protocol=cb;protocol.encode=function(message){return JSON.stringify(message)};protocol.version=version;protocol.versionLong="Version "+version;protocol.type="protocol";return protocol}},{"./frame":9}],18:[function(require,module,exports){var EventEmitter=require("events").EventEmitter,_=require("underscore");var Region=module.exports=function(start,end){this.start=new Vector(start);this.end=new Vector(end);this.enteredFrame=null};Region.prototype.hasPointables=function(frame){for(var i=0;i!=frame.pointables.length;i++){var position=frame.pointables[i].tipPosition;if(position.x>=this.start.x&&position.x<=this.end.x&&position.y>=this.start.y&&position.y<=this.end.y&&position.z>=this.start.z&&position.z<=this.end.z){return true}}return false};Region.prototype.listener=function(opts){var region=this;if(opts&&opts.nearThreshold)this.setupNearRegion(opts.nearThreshold);return function(frame){return region.updatePosition(frame)}};Region.prototype.clipper=function(){var region=this;return function(frame){region.updatePosition(frame);return region.enteredFrame?frame:null}};Region.prototype.setupNearRegion=function(distance){var nearRegion=this.nearRegion=new Region([this.start.x-distance,this.start.y-distance,this.start.z-distance],[this.end.x+distance,this.end.y+distance,this.end.z+distance]);var region=this;nearRegion.on("enter",function(frame){region.emit("near",frame)});nearRegion.on("exit",function(frame){region.emit("far",frame)});region.on("exit",function(frame){region.emit("near",frame)})};Region.prototype.updatePosition=function(frame){if(this.nearRegion)this.nearRegion.updatePosition(frame);if(this.hasPointables(frame)&&this.enteredFrame==null){this.enteredFrame=frame;this.emit("enter",this.enteredFrame)}else if(!this.hasPointables(frame)&&this.enteredFrame!=null){this.enteredFrame=null;this.emit("exit",this.enteredFrame)}return frame};Region.prototype.normalize=function(position){return new Vector([(position.x-this.start.x)/(this.end.x-this.start.x),(position.y-this.start.y)/(this.end.y-this.start.y),(position.z-this.start.z)/(this.end.z-this.start.z)])};Region.prototype.mapToXY=function(position,width,height){var normalized=this.normalize(position);var x=normalized.x,y=normalized.y;if(x>1)x=1;else if(x<-1)x=-1;if(y>1)y=1;else if(y<-1)y=-1;return[(x+1)/2*width,(1-y)/2*height,normalized.z]};_.extend(Region.prototype,EventEmitter.prototype)},{events:6,underscore:20}]},{},[1]);
/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
    'use strict';

/**
 * Hammer
 * use this to create instances
 * @param   {HTMLElement}   element
 * @param   {Object}        options
 * @returns {Hammer.Instance}
 * @constructor
 */
var Hammer = function(element, options) {
    return new Hammer.Instance(element, options || {});
};

// default settings
Hammer.defaults = {
    // add styles and attributes to the element to prevent the browser from doing
    // its native behavior. this doesnt prevent the scrolling, but cancels
    // the contextmenu, tap highlighting etc
    // set to false to disable this
    stop_browser_behavior: {
		// this also triggers onselectstart=false for IE
        userSelect: 'none',
		// this makes the element blocking in IE10 >, you could experiment with the value
		// see for more options this issue; https://github.com/EightMedia/hammer.js/issues/241
        touchAction: 'none',
		touchCallout: 'none',
        contentZooming: 'none',
        userDrag: 'none',
        tapHighlightColor: 'rgba(0,0,0,0)'
    }

    // more settings are defined per gesture at gestures.js
};

// detect touchevents
Hammer.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;
Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

// dont use mouseevents on mobile devices
Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
Hammer.NO_MOUSEEVENTS = Hammer.HAS_TOUCHEVENTS && navigator.userAgent.match(Hammer.MOBILE_REGEX);

// eventtypes per touchevent (start, move, end)
// are filled by Hammer.event.determineEventTypes on setup
Hammer.EVENT_TYPES = {};

// direction defines
Hammer.DIRECTION_DOWN = 'down';
Hammer.DIRECTION_LEFT = 'left';
Hammer.DIRECTION_UP = 'up';
Hammer.DIRECTION_RIGHT = 'right';

// pointer type
Hammer.POINTER_MOUSE = 'mouse';
Hammer.POINTER_TOUCH = 'touch';
Hammer.POINTER_PEN = 'pen';

// touch event defines
Hammer.EVENT_START = 'start';
Hammer.EVENT_MOVE = 'move';
Hammer.EVENT_END = 'end';

// hammer document where the base events are added at
Hammer.DOCUMENT = document;

// plugins namespace
Hammer.plugins = {};

// if the window events are set...
Hammer.READY = false;

/**
 * setup events to detect gestures on the document
 */
function setup() {
    if(Hammer.READY) {
        return;
    }

    // find what eventtypes we add listeners to
    Hammer.event.determineEventTypes();

    // Register all gestures inside Hammer.gestures
    for(var name in Hammer.gestures) {
        if(Hammer.gestures.hasOwnProperty(name)) {
            Hammer.detection.register(Hammer.gestures[name]);
        }
    }

    // Add touch events on the document
    Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_MOVE, Hammer.detection.detect);
    Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_END, Hammer.detection.detect);

    // Hammer is ready...!
    Hammer.READY = true;
}

/**
 * create new hammer instance
 * all methods should return the instance itself, so it is chainable.
 * @param   {HTMLElement}       element
 * @param   {Object}            [options={}]
 * @returns {Hammer.Instance}
 * @constructor
 */
Hammer.Instance = function(element, options) {
    var self = this;

    // setup HammerJS window events and register all gestures
    // this also sets up the default options
    setup();

    this.element = element;

    // start/stop detection option
    this.enabled = true;

    // merge options
    this.options = Hammer.utils.extend(
        Hammer.utils.extend({}, Hammer.defaults),
        options || {});

    // add some css to the element to prevent the browser from doing its native behavoir
    if(this.options.stop_browser_behavior) {
        Hammer.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior);
    }

    // start detection on touchstart
    Hammer.event.onTouch(element, Hammer.EVENT_START, function(ev) {
        if(self.enabled) {
            Hammer.detection.startDetect(self, ev);
        }
    });

    // return instance
    return this;
};


Hammer.Instance.prototype = {
    /**
     * bind events to the instance
     * @param   {String}      gesture
     * @param   {Function}    handler
     * @returns {Hammer.Instance}
     */
    on: function onEvent(gesture, handler){
        var gestures = gesture.split(' ');
        for(var t=0; t<gestures.length; t++) {
            this.element.addEventListener(gestures[t], handler, false);
        }
        return this;
    },


    /**
     * unbind events to the instance
     * @param   {String}      gesture
     * @param   {Function}    handler
     * @returns {Hammer.Instance}
     */
    off: function offEvent(gesture, handler){
        var gestures = gesture.split(' ');
        for(var t=0; t<gestures.length; t++) {
            this.element.removeEventListener(gestures[t], handler, false);
        }
        return this;
    },


    /**
     * trigger gesture event
     * @param   {String}      gesture
     * @param   {Object}      eventData
     * @returns {Hammer.Instance}
     */
    trigger: function triggerEvent(gesture, eventData){
        // create DOM event
        var event = Hammer.DOCUMENT.createEvent('Event');
		event.initEvent(gesture, true, true);
		event.gesture = eventData;

        // trigger on the target if it is in the instance element,
        // this is for event delegation tricks
        var element = this.element;
        if(Hammer.utils.hasParent(eventData.target, element)) {
            element = eventData.target;
        }

        element.dispatchEvent(event);
        return this;
    },


    /**
     * enable of disable hammer.js detection
     * @param   {Boolean}   state
     * @returns {Hammer.Instance}
     */
    enable: function enable(state) {
        this.enabled = state;
        return this;
    }
};

/**
 * this holds the last move event,
 * used to fix empty touchend issue
 * see the onTouch event for an explanation
 * @type {Object}
 */
var last_move_event = null;


/**
 * when the mouse is hold down, this is true
 * @type {Boolean}
 */
var enable_detect = false;


/**
 * when touch events have been fired, this is true
 * @type {Boolean}
 */
var touch_triggered = false;


Hammer.event = {
    /**
     * simple addEventListener
     * @param   {HTMLElement}   element
     * @param   {String}        type
     * @param   {Function}      handler
     */
    bindDom: function(element, type, handler) {
        var types = type.split(' ');
        for(var t=0; t<types.length; t++) {
            element.addEventListener(types[t], handler, false);
        }
    },


    /**
     * touch events with mouse fallback
     * @param   {HTMLElement}   element
     * @param   {String}        eventType        like Hammer.EVENT_MOVE
     * @param   {Function}      handler
     */
    onTouch: function onTouch(element, eventType, handler) {
		var self = this;

        this.bindDom(element, Hammer.EVENT_TYPES[eventType], function bindDomOnTouch(ev) {
            var sourceEventType = ev.type.toLowerCase();

            // onmouseup, but when touchend has been fired we do nothing.
            // this is for touchdevices which also fire a mouseup on touchend
            if(sourceEventType.match(/mouse/) && touch_triggered) {
                return;
            }

            // mousebutton must be down or a touch event
            else if( sourceEventType.match(/touch/) ||   // touch events are always on screen
                sourceEventType.match(/pointerdown/) || // pointerevents touch
                (sourceEventType.match(/mouse/) && ev.which === 1)   // mouse is pressed
            ){
                enable_detect = true;
            }

            // we are in a touch event, set the touch triggered bool to true,
            // this for the conflicts that may occur on ios and android
            if(sourceEventType.match(/touch|pointer/)) {
                touch_triggered = true;
            }

            // count the total touches on the screen
            var count_touches = 0;

            // when touch has been triggered in this detection session
            // and we are now handling a mouse event, we stop that to prevent conflicts
            if(enable_detect) {
                // update pointerevent
                if(Hammer.HAS_POINTEREVENTS && eventType != Hammer.EVENT_END) {
                    count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
                }
                // touch
                else if(sourceEventType.match(/touch/)) {
                    count_touches = ev.touches.length;
                }
                // mouse
                else if(!touch_triggered) {
                    count_touches = sourceEventType.match(/up/) ? 0 : 1;
                }

                // if we are in a end event, but when we remove one touch and
                // we still have enough, set eventType to move
                if(count_touches > 0 && eventType == Hammer.EVENT_END) {
                    eventType = Hammer.EVENT_MOVE;
                }
                // no touches, force the end event
                else if(!count_touches) {
                    eventType = Hammer.EVENT_END;
                }

                // because touchend has no touches, and we often want to use these in our gestures,
                // we send the last move event as our eventData in touchend
                if(!count_touches && last_move_event !== null) {
                    ev = last_move_event;
                }
                // store the last move event
                else {
                    last_move_event = ev;
                }

                // trigger the handler
                handler.call(Hammer.detection, self.collectEventData(element, eventType, ev));

                // remove pointerevent from list
                if(Hammer.HAS_POINTEREVENTS && eventType == Hammer.EVENT_END) {
                    count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
                }
            }

            //debug(sourceEventType +" "+ eventType);

            // on the end we reset everything
            if(!count_touches) {
                last_move_event = null;
                enable_detect = false;
                touch_triggered = false;
                Hammer.PointerEvent.reset();
            }
        });
    },


    /**
     * we have different events for each device/browser
     * determine what we need and set them in the Hammer.EVENT_TYPES constant
     */
    determineEventTypes: function determineEventTypes() {
        // determine the eventtype we want to set
        var types;

        // pointerEvents magic
        if(Hammer.HAS_POINTEREVENTS) {
            types = Hammer.PointerEvent.getEvents();
        }
        // on Android, iOS, blackberry, windows mobile we dont want any mouseevents
        else if(Hammer.NO_MOUSEEVENTS) {
            types = [
                'touchstart',
                'touchmove',
                'touchend touchcancel'];
        }
        // for non pointer events browsers and mixed browsers,
        // like chrome on windows8 touch laptop
        else {
            types = [
                'touchstart mousedown',
                'touchmove mousemove',
                'touchend touchcancel mouseup'];
        }

        Hammer.EVENT_TYPES[Hammer.EVENT_START]  = types[0];
        Hammer.EVENT_TYPES[Hammer.EVENT_MOVE]   = types[1];
        Hammer.EVENT_TYPES[Hammer.EVENT_END]    = types[2];
    },


    /**
     * create touchlist depending on the event
     * @param   {Object}    ev
     * @param   {String}    eventType   used by the fakemultitouch plugin
     */
    getTouchList: function getTouchList(ev/*, eventType*/) {
        // get the fake pointerEvent touchlist
        if(Hammer.HAS_POINTEREVENTS) {
            return Hammer.PointerEvent.getTouchList();
        }
        // get the touchlist
        else if(ev.touches) {
            return ev.touches;
        }
        // make fake touchlist from mouse position
        else {
            return [{
                identifier: 1,
                pageX: ev.pageX,
                pageY: ev.pageY,
                target: ev.target
            }];
        }
    },


    /**
     * collect event data for Hammer js
     * @param   {HTMLElement}   element
     * @param   {String}        eventType        like Hammer.EVENT_MOVE
     * @param   {Object}        eventData
     */
    collectEventData: function collectEventData(element, eventType, ev) {
        var touches = this.getTouchList(ev, eventType);

        // find out pointerType
        var pointerType = Hammer.POINTER_TOUCH;
        if(ev.type.match(/mouse/) || Hammer.PointerEvent.matchType(Hammer.POINTER_MOUSE, ev)) {
            pointerType = Hammer.POINTER_MOUSE;
        }

        return {
            center      : Hammer.utils.getCenter(touches),
            timeStamp   : new Date().getTime(),
            target      : ev.target,
            touches     : touches,
            eventType   : eventType,
            pointerType : pointerType,
            srcEvent    : ev,

            /**
             * prevent the browser default actions
             * mostly used to disable scrolling of the browser
             */
            preventDefault: function() {
                if(this.srcEvent.preventManipulation) {
                    this.srcEvent.preventManipulation();
                }

                if(this.srcEvent.preventDefault) {
                    this.srcEvent.preventDefault();
                }
            },

            /**
             * stop bubbling the event up to its parents
             */
            stopPropagation: function() {
                this.srcEvent.stopPropagation();
            },

            /**
             * immediately stop gesture detection
             * might be useful after a swipe was detected
             * @return {*}
             */
            stopDetect: function() {
                return Hammer.detection.stopDetect();
            }
        };
    }
};

Hammer.PointerEvent = {
    /**
     * holds all pointers
     * @type {Object}
     */
    pointers: {},

    /**
     * get a list of pointers
     * @returns {Array}     touchlist
     */
    getTouchList: function() {
        var self = this;
        var touchlist = [];

        // we can use forEach since pointerEvents only is in IE10
        Object.keys(self.pointers).sort().forEach(function(id) {
            touchlist.push(self.pointers[id]);
        });
        return touchlist;
    },

    /**
     * update the position of a pointer
     * @param   {String}   type             Hammer.EVENT_END
     * @param   {Object}   pointerEvent
     */
    updatePointer: function(type, pointerEvent) {
        if(type == Hammer.EVENT_END) {
            this.pointers = {};
        }
        else {
            pointerEvent.identifier = pointerEvent.pointerId;
            this.pointers[pointerEvent.pointerId] = pointerEvent;
        }

        return Object.keys(this.pointers).length;
    },

    /**
     * check if ev matches pointertype
     * @param   {String}        pointerType     Hammer.POINTER_MOUSE
     * @param   {PointerEvent}  ev
     */
    matchType: function(pointerType, ev) {
        if(!ev.pointerType) {
            return false;
        }

        var types = {};
        types[Hammer.POINTER_MOUSE] = (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE || ev.pointerType == Hammer.POINTER_MOUSE);
        types[Hammer.POINTER_TOUCH] = (ev.pointerType == ev.MSPOINTER_TYPE_TOUCH || ev.pointerType == Hammer.POINTER_TOUCH);
        types[Hammer.POINTER_PEN] = (ev.pointerType == ev.MSPOINTER_TYPE_PEN || ev.pointerType == Hammer.POINTER_PEN);
        return types[pointerType];
    },


    /**
     * get events
     */
    getEvents: function() {
        return [
            'pointerdown MSPointerDown',
            'pointermove MSPointerMove',
            'pointerup pointercancel MSPointerUp MSPointerCancel'
        ];
    },

    /**
     * reset the list
     */
    reset: function() {
        this.pointers = {};
    }
};


Hammer.utils = {
    /**
     * extend method,
     * also used for cloning when dest is an empty object
     * @param   {Object}    dest
     * @param   {Object}    src
	 * @parm	{Boolean}	merge		do a merge
     * @returns {Object}    dest
     */
    extend: function extend(dest, src, merge) {
        for (var key in src) {
			if(dest[key] !== undefined && merge) {
				continue;
			}
            dest[key] = src[key];
        }
        return dest;
    },


    /**
     * find if a node is in the given parent
     * used for event delegation tricks
     * @param   {HTMLElement}   node
     * @param   {HTMLElement}   parent
     * @returns {boolean}       has_parent
     */
    hasParent: function(node, parent) {
        while(node){
            if(node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    },


    /**
     * get the center of all the touches
     * @param   {Array}     touches
     * @returns {Object}    center
     */
    getCenter: function getCenter(touches) {
        var valuesX = [], valuesY = [];

        for(var t= 0,len=touches.length; t<len; t++) {
            valuesX.push(touches[t].pageX);
            valuesY.push(touches[t].pageY);
        }

        return {
            pageX: ((Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2),
            pageY: ((Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2)
        };
    },


    /**
     * calculate the velocity between two points
     * @param   {Number}    delta_time
     * @param   {Number}    delta_x
     * @param   {Number}    delta_y
     * @returns {Object}    velocity
     */
    getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
        return {
            x: Math.abs(delta_x / delta_time) || 0,
            y: Math.abs(delta_y / delta_time) || 0
        };
    },


    /**
     * calculate the angle between two coordinates
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {Number}    angle
     */
    getAngle: function getAngle(touch1, touch2) {
        var y = touch2.pageY - touch1.pageY,
            x = touch2.pageX - touch1.pageX;
        return Math.atan2(y, x) * 180 / Math.PI;
    },


    /**
     * angle to direction define
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {String}    direction constant, like Hammer.DIRECTION_LEFT
     */
    getDirection: function getDirection(touch1, touch2) {
        var x = Math.abs(touch1.pageX - touch2.pageX),
            y = Math.abs(touch1.pageY - touch2.pageY);

        if(x >= y) {
            return touch1.pageX - touch2.pageX > 0 ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
        }
        else {
            return touch1.pageY - touch2.pageY > 0 ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
        }
    },


    /**
     * calculate the distance between two touches
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {Number}    distance
     */
    getDistance: function getDistance(touch1, touch2) {
        var x = touch2.pageX - touch1.pageX,
            y = touch2.pageY - touch1.pageY;
        return Math.sqrt((x*x) + (y*y));
    },


    /**
     * calculate the scale factor between two touchLists (fingers)
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param   {Array}     start
     * @param   {Array}     end
     * @returns {Number}    scale
     */
    getScale: function getScale(start, end) {
        // need two fingers...
        if(start.length >= 2 && end.length >= 2) {
            return this.getDistance(end[0], end[1]) /
                this.getDistance(start[0], start[1]);
        }
        return 1;
    },


    /**
     * calculate the rotation degrees between two touchLists (fingers)
     * @param   {Array}     start
     * @param   {Array}     end
     * @returns {Number}    rotation
     */
    getRotation: function getRotation(start, end) {
        // need two fingers
        if(start.length >= 2 && end.length >= 2) {
            return this.getAngle(end[1], end[0]) -
                this.getAngle(start[1], start[0]);
        }
        return 0;
    },


    /**
     * boolean if the direction is vertical
     * @param    {String}    direction
     * @returns  {Boolean}   is_vertical
     */
    isVertical: function isVertical(direction) {
        return (direction == Hammer.DIRECTION_UP || direction == Hammer.DIRECTION_DOWN);
    },


    /**
     * stop browser default behavior with css props
     * @param   {HtmlElement}   element
     * @param   {Object}        css_props
     */
    stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(element, css_props) {
        var prop,
            vendors = ['webkit','khtml','moz','ms','o',''];

        if(!css_props || !element.style) {
            return;
        }

        // with css properties for modern browsers
        for(var i = 0; i < vendors.length; i++) {
            for(var p in css_props) {
                if(css_props.hasOwnProperty(p)) {
                    prop = p;

                    // vender prefix at the property
                    if(vendors[i]) {
                        prop = vendors[i] + prop.substring(0, 1).toUpperCase() + prop.substring(1);
                    }

                    // set the style
                    element.style[prop] = css_props[p];
                }
            }
        }

        // also the disable onselectstart
        if(css_props.userSelect == 'none') {
            element.onselectstart = function() {
                return false;
            };
        }
    }
};

Hammer.detection = {
    // contains all registred Hammer.gestures in the correct order
    gestures: [],

    // data of the current Hammer.gesture detection session
    current: null,

    // the previous Hammer.gesture session data
    // is a full clone of the previous gesture.current object
    previous: null,

    // when this becomes true, no gestures are fired
    stopped: false,


    /**
     * start Hammer.gesture detection
     * @param   {Hammer.Instance}   inst
     * @param   {Object}            eventData
     */
    startDetect: function startDetect(inst, eventData) {
        // already busy with a Hammer.gesture detection on an element
        if(this.current) {
            return;
        }

        this.stopped = false;

        this.current = {
            inst        : inst, // reference to HammerInstance we're working for
            startEvent  : Hammer.utils.extend({}, eventData), // start eventData for distances, timing etc
            lastEvent   : false, // last eventData
            name        : '' // current gesture we're in/detected, can be 'tap', 'hold' etc
        };

        this.detect(eventData);
    },


    /**
     * Hammer.gesture detection
     * @param   {Object}    eventData
     * @param   {Object}    eventData
     */
    detect: function detect(eventData) {
        if(!this.current || this.stopped) {
            return;
        }

        // extend event data with calculations about scale, distance etc
        eventData = this.extendEventData(eventData);

        // instance options
        var inst_options = this.current.inst.options;

        // call Hammer.gesture handlers
        for(var g=0,len=this.gestures.length; g<len; g++) {
            var gesture = this.gestures[g];

            // only when the instance options have enabled this gesture
            if(!this.stopped && inst_options[gesture.name] !== false) {
                // if a handler returns false, we stop with the detection
                if(gesture.handler.call(gesture, eventData, this.current.inst) === false) {
                    this.stopDetect();
                    break;
                }
            }
        }

        // store as previous event event
        if(this.current) {
            this.current.lastEvent = eventData;
        }

        // endevent, but not the last touch, so dont stop
        if(eventData.eventType == Hammer.EVENT_END && !eventData.touches.length-1) {
            this.stopDetect();
        }

        return eventData;
    },


    /**
     * clear the Hammer.gesture vars
     * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
     * to stop other Hammer.gestures from being fired
     */
    stopDetect: function stopDetect() {
        // clone current data to the store as the previous gesture
        // used for the double tap gesture, since this is an other gesture detect session
        this.previous = Hammer.utils.extend({}, this.current);

        // reset the current
        this.current = null;

        // stopped!
        this.stopped = true;
    },


    /**
     * extend eventData for Hammer.gestures
     * @param   {Object}   ev
     * @returns {Object}   ev
     */
    extendEventData: function extendEventData(ev) {
        var startEv = this.current.startEvent;

        // if the touches change, set the new touches over the startEvent touches
        // this because touchevents don't have all the touches on touchstart, or the
        // user must place his fingers at the EXACT same time on the screen, which is not realistic
        // but, sometimes it happens that both fingers are touching at the EXACT same time
        if(startEv && (ev.touches.length != startEv.touches.length || ev.touches === startEv.touches)) {
            // extend 1 level deep to get the touchlist with the touch objects
            startEv.touches = [];
            for(var i=0,len=ev.touches.length; i<len; i++) {
                startEv.touches.push(Hammer.utils.extend({}, ev.touches[i]));
            }
        }

        var delta_time = ev.timeStamp - startEv.timeStamp,
            delta_x = ev.center.pageX - startEv.center.pageX,
            delta_y = ev.center.pageY - startEv.center.pageY,
            velocity = Hammer.utils.getVelocity(delta_time, delta_x, delta_y);

        Hammer.utils.extend(ev, {
            deltaTime   : delta_time,

            deltaX      : delta_x,
            deltaY      : delta_y,

            velocityX   : velocity.x,
            velocityY   : velocity.y,

            distance    : Hammer.utils.getDistance(startEv.center, ev.center),
            angle       : Hammer.utils.getAngle(startEv.center, ev.center),
            direction   : Hammer.utils.getDirection(startEv.center, ev.center),

            scale       : Hammer.utils.getScale(startEv.touches, ev.touches),
            rotation    : Hammer.utils.getRotation(startEv.touches, ev.touches),

            startEvent  : startEv
        });

        return ev;
    },


    /**
     * register new gesture
     * @param   {Object}    gesture object, see gestures.js for documentation
     * @returns {Array}     gestures
     */
    register: function register(gesture) {
        // add an enable gesture options if there is no given
        var options = gesture.defaults || {};
        if(options[gesture.name] === undefined) {
            options[gesture.name] = true;
        }

        // extend Hammer default options with the Hammer.gesture options
        Hammer.utils.extend(Hammer.defaults, options, true);

        // set its index
        gesture.index = gesture.index || 1000;

        // add Hammer.gesture to the list
        this.gestures.push(gesture);

        // sort the list by index
        this.gestures.sort(function(a, b) {
            if (a.index < b.index) {
                return -1;
            }
            if (a.index > b.index) {
                return 1;
            }
            return 0;
        });

        return this.gestures;
    }
};


Hammer.gestures = Hammer.gestures || {};

/**
 * Custom gestures
 * ==============================
 *
 * Gesture object
 * --------------------
 * The object structure of a gesture:
 *
 * { name: 'mygesture',
 *   index: 1337,
 *   defaults: {
 *     mygesture_option: true
 *   }
 *   handler: function(type, ev, inst) {
 *     // trigger gesture event
 *     inst.trigger(this.name, ev);
 *   }
 * }

 * @param   {String}    name
 * this should be the name of the gesture, lowercase
 * it is also being used to disable/enable the gesture per instance config.
 *
 * @param   {Number}    [index=1000]
 * the index of the gesture, where it is going to be in the stack of gestures detection
 * like when you build an gesture that depends on the drag gesture, it is a good
 * idea to place it after the index of the drag gesture.
 *
 * @param   {Object}    [defaults={}]
 * the default settings of the gesture. these are added to the instance settings,
 * and can be overruled per instance. you can also add the name of the gesture,
 * but this is also added by default (and set to true).
 *
 * @param   {Function}  handler
 * this handles the gesture detection of your custom gesture and receives the
 * following arguments:
 *
 *      @param  {Object}    eventData
 *      event data containing the following properties:
 *          timeStamp   {Number}        time the event occurred
 *          target      {HTMLElement}   target element
 *          touches     {Array}         touches (fingers, pointers, mouse) on the screen
 *          pointerType {String}        kind of pointer that was used. matches Hammer.POINTER_MOUSE|TOUCH
 *          center      {Object}        center position of the touches. contains pageX and pageY
 *          deltaTime   {Number}        the total time of the touches in the screen
 *          deltaX      {Number}        the delta on x axis we haved moved
 *          deltaY      {Number}        the delta on y axis we haved moved
 *          velocityX   {Number}        the velocity on the x
 *          velocityY   {Number}        the velocity on y
 *          angle       {Number}        the angle we are moving
 *          direction   {String}        the direction we are moving. matches Hammer.DIRECTION_UP|DOWN|LEFT|RIGHT
 *          distance    {Number}        the distance we haved moved
 *          scale       {Number}        scaling of the touches, needs 2 touches
 *          rotation    {Number}        rotation of the touches, needs 2 touches *
 *          eventType   {String}        matches Hammer.EVENT_START|MOVE|END
 *          srcEvent    {Object}        the source event, like TouchStart or MouseDown *
 *          startEvent  {Object}        contains the same properties as above,
 *                                      but from the first touch. this is used to calculate
 *                                      distances, deltaTime, scaling etc
 *
 *      @param  {Hammer.Instance}    inst
 *      the instance we are doing the detection for. you can get the options from
 *      the inst.options object and trigger the gesture event by calling inst.trigger
 *
 *
 * Handle gestures
 * --------------------
 * inside the handler you can get/set Hammer.detection.current. This is the current
 * detection session. It has the following properties
 *      @param  {String}    name
 *      contains the name of the gesture we have detected. it has not a real function,
 *      only to check in other gestures if something is detected.
 *      like in the drag gesture we set it to 'drag' and in the swipe gesture we can
 *      check if the current gesture is 'drag' by accessing Hammer.detection.current.name
 *
 *      @readonly
 *      @param  {Hammer.Instance}    inst
 *      the instance we do the detection for
 *
 *      @readonly
 *      @param  {Object}    startEvent
 *      contains the properties of the first gesture detection in this session.
 *      Used for calculations about timing, distance, etc.
 *
 *      @readonly
 *      @param  {Object}    lastEvent
 *      contains all the properties of the last gesture detect in this session.
 *
 * after the gesture detection session has been completed (user has released the screen)
 * the Hammer.detection.current object is copied into Hammer.detection.previous,
 * this is usefull for gestures like doubletap, where you need to know if the
 * previous gesture was a tap
 *
 * options that have been set by the instance can be received by calling inst.options
 *
 * You can trigger a gesture event by calling inst.trigger("mygesture", event).
 * The first param is the name of your gesture, the second the event argument
 *
 *
 * Register gestures
 * --------------------
 * When an gesture is added to the Hammer.gestures object, it is auto registered
 * at the setup of the first Hammer instance. You can also call Hammer.detection.register
 * manually and pass your gesture object as a param
 *
 */

/**
 * Hold
 * Touch stays at the same place for x time
 * @events  hold
 */
Hammer.gestures.Hold = {
    name: 'hold',
    index: 10,
    defaults: {
        hold_timeout	: 500,
        hold_threshold	: 1
    },
    timer: null,
    handler: function holdGesture(ev, inst) {
        switch(ev.eventType) {
            case Hammer.EVENT_START:
                // clear any running timers
                clearTimeout(this.timer);

                // set the gesture so we can check in the timeout if it still is
                Hammer.detection.current.name = this.name;

                // set timer and if after the timeout it still is hold,
                // we trigger the hold event
                this.timer = setTimeout(function() {
                    if(Hammer.detection.current.name == 'hold') {
                        inst.trigger('hold', ev);
                    }
                }, inst.options.hold_timeout);
                break;

            // when you move or end we clear the timer
            case Hammer.EVENT_MOVE:
                if(ev.distance > inst.options.hold_threshold) {
                    clearTimeout(this.timer);
                }
                break;

            case Hammer.EVENT_END:
                clearTimeout(this.timer);
                break;
        }
    }
};


/**
 * Tap/DoubleTap
 * Quick touch at a place or double at the same place
 * @events  tap, doubletap
 */
Hammer.gestures.Tap = {
    name: 'tap',
    index: 100,
    defaults: {
        tap_max_touchtime	: 250,
        tap_max_distance	: 10,
		tap_always			: true,
        doubletap_distance	: 20,
        doubletap_interval	: 300
    },
    handler: function tapGesture(ev, inst) {
        if(ev.eventType == Hammer.EVENT_END) {
            // previous gesture, for the double tap since these are two different gesture detections
            var prev = Hammer.detection.previous,
				did_doubletap = false;

            // when the touchtime is higher then the max touch time
            // or when the moving distance is too much
            if(ev.deltaTime > inst.options.tap_max_touchtime ||
                ev.distance > inst.options.tap_max_distance) {
                return;
            }

            // check if double tap
            if(prev && prev.name == 'tap' &&
                (ev.timeStamp - prev.lastEvent.timeStamp) < inst.options.doubletap_interval &&
                ev.distance < inst.options.doubletap_distance) {
				inst.trigger('doubletap', ev);
				did_doubletap = true;
            }

			// do a single tap
			if(!did_doubletap || inst.options.tap_always) {
				Hammer.detection.current.name = 'tap';
				inst.trigger(Hammer.detection.current.name, ev);
			}
        }
    }
};


/**
 * Swipe
 * triggers swipe events when the end velocity is above the threshold
 * @events  swipe, swipeleft, swiperight, swipeup, swipedown
 */
Hammer.gestures.Swipe = {
    name: 'swipe',
    index: 40,
    defaults: {
        // set 0 for unlimited, but this can conflict with transform
        swipe_max_touches  : 1,
        swipe_velocity     : 0.7
    },
    handler: function swipeGesture(ev, inst) {
        if(ev.eventType == Hammer.EVENT_END) {
            // max touches
            if(inst.options.swipe_max_touches > 0 &&
                ev.touches.length > inst.options.swipe_max_touches) {
                return;
            }

            // when the distance we moved is too small we skip this gesture
            // or we can be already in dragging
            if(ev.velocityX > inst.options.swipe_velocity ||
                ev.velocityY > inst.options.swipe_velocity) {
                // trigger swipe events
                inst.trigger(this.name, ev);
                inst.trigger(this.name + ev.direction, ev);
            }
        }
    }
};


/**
 * Drag
 * Move with x fingers (default 1) around on the page. Blocking the scrolling when
 * moving left and right is a good practice. When all the drag events are blocking
 * you disable scrolling on that area.
 * @events  drag, drapleft, dragright, dragup, dragdown
 */
Hammer.gestures.Drag = {
    name: 'drag',
    index: 50,
    defaults: {
        drag_min_distance : 10,
        // set 0 for unlimited, but this can conflict with transform
        drag_max_touches  : 1,
        // prevent default browser behavior when dragging occurs
        // be careful with it, it makes the element a blocking element
        // when you are using the drag gesture, it is a good practice to set this true
        drag_block_horizontal   : false,
        drag_block_vertical     : false,
        // drag_lock_to_axis keeps the drag gesture on the axis that it started on,
        // It disallows vertical directions if the initial direction was horizontal, and vice versa.
        drag_lock_to_axis       : false,
        // drag lock only kicks in when distance > drag_lock_min_distance
        // This way, locking occurs only when the distance has become large enough to reliably determine the direction
        drag_lock_min_distance : 25
    },
    triggered: false,
    handler: function dragGesture(ev, inst) {
        // current gesture isnt drag, but dragged is true
        // this means an other gesture is busy. now call dragend
        if(Hammer.detection.current.name != this.name && this.triggered) {
            inst.trigger(this.name +'end', ev);
            this.triggered = false;
            return;
        }

        // max touches
        if(inst.options.drag_max_touches > 0 &&
            ev.touches.length > inst.options.drag_max_touches) {
            return;
        }

        switch(ev.eventType) {
            case Hammer.EVENT_START:
                this.triggered = false;
                break;

            case Hammer.EVENT_MOVE:
                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(ev.distance < inst.options.drag_min_distance &&
                    Hammer.detection.current.name != this.name) {
                    return;
                }

                // we are dragging!
                Hammer.detection.current.name = this.name;

                // lock drag to axis?
                if(Hammer.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance<=ev.distance)) {
                    ev.drag_locked_to_axis = true;
                }
                var last_direction = Hammer.detection.current.lastEvent.direction;
                if(ev.drag_locked_to_axis && last_direction !== ev.direction) {
                    // keep direction on the axis that the drag gesture started on
                    if(Hammer.utils.isVertical(last_direction)) {
                        ev.direction = (ev.deltaY < 0) ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
                    }
                    else {
                        ev.direction = (ev.deltaX < 0) ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
                    }
                }

                // first time, trigger dragstart event
                if(!this.triggered) {
                    inst.trigger(this.name +'start', ev);
                    this.triggered = true;
                }

                // trigger normal event
                inst.trigger(this.name, ev);

                // direction event, like dragdown
                inst.trigger(this.name + ev.direction, ev);

                // block the browser events
                if( (inst.options.drag_block_vertical && Hammer.utils.isVertical(ev.direction)) ||
                    (inst.options.drag_block_horizontal && !Hammer.utils.isVertical(ev.direction))) {
                    ev.preventDefault();
                }
                break;

            case Hammer.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                    inst.trigger(this.name +'end', ev);
                }

                this.triggered = false;
                break;
        }
    }
};


/**
 * Transform
 * User want to scale or rotate with 2 fingers
 * @events  transform, pinch, pinchin, pinchout, rotate
 */
Hammer.gestures.Transform = {
    name: 'transform',
    index: 45,
    defaults: {
        // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
        transform_min_scale     : 0.01,
        // rotation in degrees
        transform_min_rotation  : 1,
        // prevent default browser behavior when two touches are on the screen
        // but it makes the element a blocking element
        // when you are using the transform gesture, it is a good practice to set this true
        transform_always_block  : false
    },
    triggered: false,
    handler: function transformGesture(ev, inst) {
        // current gesture isnt drag, but dragged is true
        // this means an other gesture is busy. now call dragend
        if(Hammer.detection.current.name != this.name && this.triggered) {
            inst.trigger(this.name +'end', ev);
            this.triggered = false;
            return;
        }

        // atleast multitouch
        if(ev.touches.length < 2) {
            return;
        }

        // prevent default when two fingers are on the screen
        if(inst.options.transform_always_block) {
            ev.preventDefault();
        }

        switch(ev.eventType) {
            case Hammer.EVENT_START:
                this.triggered = false;
                break;

            case Hammer.EVENT_MOVE:
                var scale_threshold = Math.abs(1-ev.scale);
                var rotation_threshold = Math.abs(ev.rotation);

                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(scale_threshold < inst.options.transform_min_scale &&
                    rotation_threshold < inst.options.transform_min_rotation) {
                    return;
                }

                // we are transforming!
                Hammer.detection.current.name = this.name;

                // first time, trigger dragstart event
                if(!this.triggered) {
                    inst.trigger(this.name +'start', ev);
                    this.triggered = true;
                }

                inst.trigger(this.name, ev); // basic transform event

                // trigger rotate event
                if(rotation_threshold > inst.options.transform_min_rotation) {
                    inst.trigger('rotate', ev);
                }

                // trigger pinch event
                if(scale_threshold > inst.options.transform_min_scale) {
                    inst.trigger('pinch', ev);
                    inst.trigger('pinch'+ ((ev.scale < 1) ? 'in' : 'out'), ev);
                }
                break;

            case Hammer.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                    inst.trigger(this.name +'end', ev);
                }

                this.triggered = false;
                break;
        }
    }
};


/**
 * Touch
 * Called as first, tells the user has touched the screen
 * @events  touch
 */
Hammer.gestures.Touch = {
    name: 'touch',
    index: -Infinity,
    defaults: {
        // call preventDefault at touchstart, and makes the element blocking by
        // disabling the scrolling of the page, but it improves gestures like
        // transforming and dragging.
        // be careful with using this, it can be very annoying for users to be stuck
        // on the page
        prevent_default: false,

        // disable mouse events, so only touch (or pen!) input triggers events
        prevent_mouseevents: false
    },
    handler: function touchGesture(ev, inst) {
        if(inst.options.prevent_mouseevents && ev.pointerType == Hammer.POINTER_MOUSE) {
            ev.stopDetect();
            return;
        }

        if(inst.options.prevent_default) {
            ev.preventDefault();
        }

        if(ev.eventType ==  Hammer.EVENT_START) {
            inst.trigger(this.name, ev);
        }
    }
};


/**
 * Release
 * Called as last, tells the user has released the screen
 * @events  release
 */
Hammer.gestures.Release = {
    name: 'release',
    index: Infinity,
    handler: function releaseGesture(ev, inst) {
        if(ev.eventType ==  Hammer.EVENT_END) {
            inst.trigger(this.name, ev);
        }
    }
};

// node export
if(typeof module === 'object' && typeof module.exports === 'object'){
    module.exports = Hammer;
}
// just window export
else {
    window.Hammer = Hammer;

    // requireJS module definition
    if(typeof window.define === 'function' && window.define.amd) {
        window.define('hammer', [], function() {
            return Hammer;
        });
    }
}
})(this);
/*global define */

// #FIXME load leap
define( [
    'osg/Notify'
], function ( Notify ) {

    var LeapMotion = function ( viewer ) {
        this._viewer = viewer;
        this._type = 'LeapMotion';
        this._enable = true;
    };

    LeapMotion.prototype = {
        init: function ( args ) {
            var element = document.getElementById( args.id );
            var self = this;
            this._controller = new Leap.Controller( {
                enableGestures: args.gestures || true,
                tryReconnectOnDisconnect: false
            } );
            this._controller.on( 'ready', function () {
                if ( args.readyCallback )
                    args.readyCallback( self._controller );
                self._leapMotionReady = true;
                Notify.info( 'leapmotion ready' );
            } );

            this._controller.loop( this._update.bind( this ) );

        },

        isValid: function () {
            if ( !this._enable )
                return false;

            var manipulator = this._viewer.getManipulator();
            if ( !manipulator )
                return false;

            var constrollerList = manipulator.getControllerList();
            if ( !constrollerList[ this._type ] )
                return false;

            return true;
        },
        getManipulatorController: function () {
            return this._viewer.getManipulator().getControllerList()[ this._type ];
        },

        // this is binded
        _update: function ( frame ) {
            if ( !frame.valid || !this.isValid() ) {
                return;
            }
            var manipulatorAdapter = this.getManipulatorController();
            if ( manipulatorAdapter.update ) {
                manipulatorAdapter.update( frame );
            }
        }
    };
    return LeapMotion;
} );
/*global define */

define( [
    'osg/Notify'
], function ( Notify ) {

    var GamePad = function ( viewer ) {
        this._viewer = viewer;
        this._type = 'GamePad';
        this._enable = true;
    };

    GamePad.prototype = {
        init: function ( args ) {

            var gamepadSupportAvailable = !! navigator.webkitGetGamepads || !! navigator.webkitGamepads;

            // || (navigator.userAgent.indexOf('Firefox/') != -1); // impossible to detect Gamepad API support in FF

            if ( !gamepadSupportAvailable ) return;

        },

        isValid: function () {
            if ( !this._enable )
                return false;

            var manipulator = this._viewer.getManipulator();
            if ( !manipulator )
                return false;

            var constrollerList = manipulator.getControllerList();
            if ( !constrollerList[ this._type ] )
                return false;

            return true;
        },

        getManipulatorController: function () {
            return this._viewer.getManipulator().getControllerList()[ this._type ];
        },

        webkitGamepadPoll: function () {
            var self = this;

            var rawGamepads = ( navigator.webkitGetGamepads && navigator.webkitGetGamepads() ) || navigator.webkitGamepads;
            if ( !rawGamepads ) {
                return;
            }

            if ( rawGamepads[ 0 ] ) {
                if ( !this._gamepad ) {
                    this.onGamepadConnect( {
                        gamepad: rawGamepads[ 0 ]
                    } );
                }
                this._gamepad = rawGamepads[ 0 ];
            } else if ( this._gamepad ) {
                this.onGamepadDisconnect( {
                    gamepad: this._gamepad
                } );
            }
        },

        onGamepadConnect: function ( evt ) {
            this._gamepad = evt.gamepad;
            Notify.log( "Detected new gamepad!", this._gamepad );
        },

        onGamepadDisconnect: function ( evt ) {
            this._gamepad = false;
            Notify.log( "Gamepad disconnected", this._gamepad );
        },
        getGamePad: function () {
            return this._gamepad;
        },

        // Called in each frame
        update: function () {

            // necessary
            this.webkitGamepadPoll();

            if ( !this._gamepad )
                return;

            var manipulatorAdapter = this.getManipulatorController();
            //manipulatorAdapter.setEventProxy(this);
            if ( manipulatorAdapter.update ) {
                manipulatorAdapter.update( this );
            }
        }
    };
    return GamePad;
} );
/*global define */

define( [], function () {

    var StandardMouseKeyboard = function ( viewer ) {
        this._enable = true;
        this._viewer = viewer;
        this._type = 'StandardMouseKeyboard';

        this._mouseEventNode = undefined;
        this._wheelEventNode = undefined;
        this._keyboardEventNode = undefined;
        this._eventList = [ 'mousedown', 'mouseup', 'mousemove', 'dblclick' ];
        this._mousePosition = [ 0, 0 ];
    };

    StandardMouseKeyboard.prototype = {
        init: function ( args ) {

            this.removeEventListeners( this._mouseEventNode, this._wheelEventNode, this._keyboardEventNode );

            var mouse = args.mouseEventNode;
            var mousewheel = args.wheelEventNode || mouse;
            var keyboard = args.keyboardEventNode || mouse;

            this.addEventListeners( mouse, mousewheel, keyboard );
            this._mouseEventNode = mouse;
            this._wheelEventNode = mousewheel;
            this._keyboardEventNode = keyboard;
        },

        addEventListeners: function ( mouse, mousewheel, keyboard ) {
            if ( mouse ) {
                for ( var i = 0, l = this._eventList.length; i < l; i++ ) {
                    var ev = this._eventList[ i ];
                    if ( this[ ev ] ) {
                        mouse.addEventListener( ev, this[ ev ].bind( this ), false );
                    }
                }
            }
            if ( mousewheel ) {
                mousewheel.addEventListener( 'DOMMouseScroll', this.mousewheel.bind( this ), false );
                mousewheel.addEventListener( 'mousewheel', this.mousewheel.bind( this ), false );
            }

            if ( keyboard ) {
                keyboard.addEventListener( 'keydown', this.keydown.bind( this ), false );
                keyboard.addEventListener( 'keyup', this.keyup.bind( this ), false );
            }
        },

        removeEventListeners: function ( mouse, mousewheel, keyboard ) {
            if ( mouse ) {
                for ( var i = 0, l = this._eventList.length; i < l; i++ ) {
                    var ev = this._eventList[ i ];
                    if ( this[ ev ] ) {
                        mouse.removeEventListener( ev, this[ ev ] );
                    }
                }
            }
            if ( mousewheel ) {
                mousewheel.removeEventListener( 'DOMMouseScroll', this.mousewheel );
                mousewheel.removeEventListener( 'mousewheel', this.mousewheel );
            }
            if ( keyboard ) {
                keyboard.removeEventListener( 'keydown', this.keydown );
                keyboard.removeEventListener( 'keyup', this.keyup );
            }
        },

        isValid: function () {
            if ( this._enable && this._viewer.getManipulator() && this._viewer.getManipulator().getControllerList()[ this._type ] )
                return true;
            return false;
        },
        getManipulatorController: function () {
            return this._viewer.getManipulator().getControllerList()[ this._type ];
        },
        keyup: function ( ev ) {
            if ( !this.isValid() )
                return;
            if ( this.getManipulatorController().keyup )
                return this.getManipulatorController().keyup( ev );
        },
        keydown: function ( ev ) {
            if ( !this.isValid() )
                return;
            if ( this.getManipulatorController().keydown )
                return this.getManipulatorController().keydown( ev );
        },

        mousedown: function ( ev ) {
            if ( !this.isValid() )
                return;
            if ( this.getManipulatorController().mousedown )
                return this.getManipulatorController().mousedown( ev );
        },

        mouseup: function ( ev ) {
            if ( !this.isValid() )
                return;
            if ( this.getManipulatorController().mouseup )
                return this.getManipulatorController().mouseup( ev );
        },

        mousemove: function ( ev ) {
            if ( !this.isValid() )
                return;
            if ( this.getManipulatorController().mousemove )
                return this.getManipulatorController().mousemove( ev );
        },

        dblclick: function ( ev ) {
            if ( !this.isValid() )
                return;
            if ( this.getManipulatorController().dblclick )
                return this.getManipulatorController().dblclick( ev );
        },

        mousewheel: function ( event ) {
            if ( !this.isValid() )
                return;

            var manipulatorAdapter = this.getManipulatorController();
            if ( !manipulatorAdapter.mousewheel )
                return;

            // from jquery
            var orgEvent = event || window.event,
                args = [].slice.call( arguments, 1 ),
                delta = 0,
                returnValue = true,
                deltaX = 0,
                deltaY = 0;
            //event = $.event.fix(orgEvent);
            event.type = 'mousewheel';

            // Old school scrollwheel delta
            if ( event.wheelDelta ) {
                delta = event.wheelDelta / 120;
            }
            if ( event.detail ) {
                delta = -event.detail / 3;
            }

            // New school multidimensional scroll (touchpads) deltas
            deltaY = delta;

            // Gecko
            if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
                deltaY = 0;
                deltaX = -1 * delta;
            }

            // Webkit
            if ( orgEvent.wheelDeltaY !== undefined ) {
                deltaY = orgEvent.wheelDeltaY / 120;
            }
            if ( orgEvent.wheelDeltaX !== undefined ) {
                deltaX = -1 * orgEvent.wheelDeltaX / 120;
            }
            // Add event and delta to the front of the arguments
            args.unshift( event, delta, deltaX, deltaY );

            return this.getManipulatorController().mousewheel.apply( manipulatorAdapter, args );
        },

        divGlobalOffset: function ( obj ) {
            var x = 0,
                y = 0;
            x = obj.offsetLeft;
            y = obj.offsetTop;
            var body = document.getElementsByTagName( 'body' )[ 0 ];
            while ( obj.offsetParent && obj != body ) {
                x += obj.offsetParent.offsetLeft;
                y += obj.offsetParent.offsetTop;
                obj = obj.offsetParent;
            }
            this._mousePosition[ 0 ] = x;
            this._mousePosition[ 1 ] = y;
            return this._mousePosition;
        },

        getPositionRelativeToCanvas: function ( e, result ) {
            var myObject = e.target;
            var posx, posy;
            if ( e.pageX || e.pageY ) {
                posx = e.pageX;
                posy = e.pageY;
            } else if ( e.clientX || e.clientY ) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            // posx and posy contain the mouse position relative to the document
            // Do something with this information
            var globalOffset = this.divGlobalOffset( myObject );
            posx = posx - globalOffset[ 0 ];
            posy = myObject.height - ( posy - globalOffset[ 1 ] );

            // NaN in camera check here
            if ( isNaN( posx ) || isNaN( posy ) ) {
                //debugger;
            }

            // copy data to result if need to keep result
            // else we use a tmp variable inside manipulator
            // that we override at each call
            if ( result === undefined ) {
                result = this._mousePosition;
            }
            result[ 0 ] = posx;
            result[ 1 ] = posy;
            return result;
        },

        // use the update to set the input device to mouse controller
        // it's needed to compute size
        update: function () {
            if ( !this.isValid() )
                return;

            this.getManipulatorController().setEventProxy( this );
        }

    };
    return StandardMouseKeyboard;
} );
/*global define */

// #FIXME load hammer lib
define( [], function () {

    var HammerController = function ( viewer ) {
        this._enable = true;
        this._viewer = viewer;
        this._type = 'Hammer';

        this._eventNode = undefined;

    };

    HammerController.prototype = {
        init: function ( args ) {

            var options = {
                prevent_default: true,
                drag_max_touches: 2,
                transform_min_scale: 0.08,
                transform_min_rotation: 180,
                transform_always_block: true,
                hold: false,
                release: false,
                swipe: false,
                tap: false
            };

            this._eventNode = args.eventNode;
            if ( this._eventNode ) {
                this._hammer = new Hammer( this._eventNode, options );
            }
        },

        isValid: function () {
            if ( this._enable && this._viewer.getManipulator() && this._viewer.getManipulator().getControllerList()[ this._type ] )
                return true;
            return false;
        },
        getManipulatorController: function () {
            return this._viewer.getManipulator().getControllerList()[ this._type ];
        },

        // use the update to set the input device to mouse controller
        // it's needed to compute size
        update: function () {
            if ( !this.isValid() )
                return;

            // we pass directly hammer object
            this.getManipulatorController().setEventProxy( this._hammer );
        }

    };
    return HammerController;
} );
/*global define */

// #FIXME load hammer
define( [
    'osgGA/FirstPersonManipulator',
    'osgGA/FirstPersonManipulatorMouseKeyboardController',
    'osgGA/Manipulator',
    'osgGA/OrbitManipulator',
    'osgGA/OrbitManipulatorGamePadController',
    'osgGA/OrbitManipulatorHammerController',
    'osgGA/OrbitManipulatorLeapMotionController',
    'osgGA/OrbitManipulatorMouseKeyboardController',
    'osgGA/SwitchManipulator'
], function ( FirstPersonManipulator, FirstPersonManipulatorMouseKeyboardController, Manipulator, OrbitManipulator, OrbitManipulatorGamePadController, OrbitManipulatorHammerController, OrbitManipulatorLeapMotionController, OrbitManipulatorMouseKeyboardController, SwitchManipulator ) {

    /** -*- compile-command: "jslint-cli osgGA.js" -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    var osgGA = {};

    // #FIXME uncomment?
    // Hammer.NO_MOUSEEVENTS = true; // disable hammer js mouse events

    osgGA.FirstPersonManipulator = FirstPersonManipulator;
    osgGA.FirstPersonManipulatorMouseKeyboardController = FirstPersonManipulatorMouseKeyboardController;
    osgGA.Manipulator = Manipulator;
    osgGA.OrbitManipulator = OrbitManipulator;
    osgGA.OrbitManipulatorGamePadController = OrbitManipulatorGamePadController;
    osgGA.OrbitManipulatorHammerController = OrbitManipulatorHammerController;
    osgGA.OrbitManipulatorLeapMotionController = OrbitManipulatorLeapMotionController;
    osgGA.OrbitManipulatorMouseKeyboardController = OrbitManipulatorMouseKeyboardController;
    osgGA.SwitchManipulator = SwitchManipulator;

    return osgGA;
} );
/*global define */

define( [
    'osg/Matrix'
], function ( Matrix ) {

    /** -*- compile-command: "jslint-cli Manipulator.js" -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    /** 
     *  Manipulator
     *  @class
     */
    var Manipulator = function () {
        this._controllerList = {};
        this._inverseMatrix = new Array( 16 );
        Matrix.makeIdentity( this._inverseMatrix );
    };

    /** @lends Manipulator.prototype */
    Manipulator.prototype = {

        // eg: var currentTime = nv.getFrameStamp().getSimulationTime();
        update: function ( nv ) {},

        getInverseMatrix: function () {
            return this._inverseMatrix;
        },

        getControllerList: function () {
            return this._controllerList;
        }
    };

    return Manipulator;
} );
/*global define */

define( [
    'osg/Notify'
], function ( Notify ) {

    var OrbitManipulatorHammerController = function ( manipulator ) {
        this._manipulator = manipulator;
        this.init();
    };

    OrbitManipulatorHammerController.prototype = {
        init: function () {
            this._panFactorX = 0.5;
            this._panFactorY = -this._panFactorX;

            this._rotateFactorX = 0.6;
            this._rotateFactorY = -this._rotateFactorX;
            this._zoomFactor = 5.0;

            this._pan = false;
            this._delay = 0.15;
        },
        setEventProxy: function ( proxy ) {
            if ( proxy === undefined || ( proxy !== undefined && proxy === this._eventProxy ) ) {
                return;
            }
            this._eventProxy = proxy;
            var self = this;
            var hammer = proxy;

            var computeTouches = function ( gesture ) {
                if ( gesture.touches !== undefined )
                    return gesture.touches.length;
                return 1; // mouse
            };

            var dragCB = function ( ev ) {
                return 'touches ' + computeTouches( ev ) + ' distance ' + ev.distance + ' x ' + ev.deltaX + ' y ' + ev.deltaY;
            };

            hammer.on( 'dragstart', function ( event ) {
                var manipulator = self._manipulator;
                if ( !manipulator || self._transformStarted ) {
                    return;
                }
                var gesture = event.gesture;
                if ( computeTouches( gesture ) === 2 ) {
                    self._pan = true;
                }

                self._dragStarted = true;
                if ( self._pan ) {
                    manipulator.getPanInterpolator().reset();
                    manipulator.getPanInterpolator().set( gesture.center.pageX * self._panFactorX, gesture.center.pageY * self._panFactorY );
                } else {
                    manipulator.getRotateInterpolator().reset();
                    manipulator.getRotateInterpolator().set( gesture.center.pageX * self._rotateFactorX, gesture.center.pageY * self._rotateFactorY );
                }
                Notify.debug( 'drag start, ' + dragCB( gesture ) );
            } );

            hammer.on( 'drag', function ( event ) {
                var manipulator = self._manipulator;
                if ( !manipulator ) {
                    return;
                }
                if ( !self._dragStarted ) {
                    return;
                }
                if ( self._transformStarted ) {
                    self._dragStarted = false;
                    return;
                }

                var gesture = event.gesture;
                if ( self._pan ) {

                    // if a pan started and we release one finger,
                    // we dont take care of the those event
                    if ( computeTouches( gesture ) !== 2 )
                        return;

                    manipulator.getPanInterpolator().setTarget( gesture.center.pageX * self._panFactorX, gesture.center.pageY * self._panFactorY );
                    Notify.debug( 'pad, ' + dragCB( gesture ) );
                } else {
                    manipulator.getRotateInterpolator().setDelay( self._delay );
                    manipulator.getRotateInterpolator().setTarget( gesture.center.pageX * self._rotateFactorX, gesture.center.pageY * self._rotateFactorY );
                    Notify.debug( 'rotate, ' + dragCB( gesture ) );
                }
            } );
            hammer.on( 'dragend', function ( event ) {
                var manipulator = self._manipulator;
                if ( !manipulator || !self._dragStarted ) {
                    return;
                }
                self._dragStarted = false;
                var gesture = event.gesture;
                self._pan = false;
                Notify.debug( 'drag end, ' + dragCB( gesture ) );
            } );

            var toucheScale;
            hammer.on( 'transformstart', function ( event ) {
                var manipulator = self._manipulator;
                if ( !manipulator ) {
                    return;
                }
                self._transformStarted = true;
                var gesture = event.gesture;

                toucheScale = gesture.scale;
                var scale = gesture.scale;
                manipulator.getZoomInterpolator().reset();
                manipulator.getZoomInterpolator().set( gesture.scale );

                Notify.debug( 'transform start ' + gesture.scale + ' ' + scale );
                event.preventDefault();
                hammer.options.drag = false;
            } );
            hammer.on( 'transformend', function ( event ) {
                self._transformStarted = false;
                Notify.debug( 'transform end ' + event.gesture.scale );
                hammer.options.drag = true;

            } );
            hammer.on( 'transform', function ( event ) {
                var manipulator = self._manipulator;
                if ( !manipulator || !self._transformStarted ) {
                    return;
                }

                var gesture = event.gesture;

                var scale = ( gesture.scale - toucheScale ) * self._zoomFactor;
                toucheScale = gesture.scale;
                var target = manipulator.getZoomInterpolator().getTarget()[ 0 ];
                manipulator.getZoomInterpolator().setTarget( target - scale );
                Notify.debug( 'transform ' + gesture.scale + ' ' + ( target - scale ) );
            } );

        },
        setManipulator: function ( manipulator ) {
            this._manipulator = manipulator;
        }
    };
    return OrbitManipulatorHammerController;
} );
/*global define */

define( [], function () {

    var OrbitManipulatorGamePadController = function ( manipulator ) {
        this._manipulator = manipulator;
        this.init();
    };

    OrbitManipulatorGamePadController.prototype = {
        init: function () {
            this._delay = 0.15;
            this._threshold = 0.08;
            this._mode = 0;
            this._padFactor = 10.0;
            this._zoomFactor = 0.5;
            this._rotateFactor = 5.0;
        },


        addPan: function ( pan, x, y ) {
            pan.setDelay( this._delay );
            pan.addTarget( x * this._padFactor, y * this._padFactor );
        },

        addZoom: function ( zoom, z ) {
            zoom.setDelay( this._delay );
            zoom.addTarget( z * this._zoomFactor );
        },

        addRotate: function ( rotate, x, y ) {
            rotate.setDelay( this._delay );
            rotateTarget = rotate.getTarget();
            rotate.addTarget( x * this._rotateFactor, y * this._rotateFactor );
        },

        gamepadaxes: function ( axes ) {

            // Block badly balanced controllers
            var AXIS_THRESHOLD = 0.005;

            var rotateTarget, panTarget;
            var rotate = this._manipulator.getRotateInterpolator();
            var zoom = this._manipulator.getZoomInterpolator();
            var pan = this._manipulator.getPanInterpolator();
            // Regular gamepads
            if ( axes.length == 4 ) {

                if ( Math.abs( axes[ 0 ] ) > AXIS_THRESHOLD || Math.abs( axes[ 1 ] ) > AXIS_THRESHOLD ) {
                    this.addRotate( rotate, -axes[ 0 ], axes[ 1 ] );
                }
                if ( Math.abs( axes[ 3 ] ) > AXIS_THRESHOLD ) {
                    this.addZoom( zoom, -axes[ 3 ] );
                }

                //SpaceNavigator & 6-axis controllers
            } else if ( axes.length >= 5 ) {
                //console.log(axes);
                if ( Math.abs( axes[ 0 ] ) > AXIS_THRESHOLD || Math.abs( axes[ 1 ] ) > AXIS_THRESHOLD ) {
                    this.addPan( pan, -axes[ 0 ], axes[ 1 ] );
                }

                if ( Math.abs( axes[ 2 ] ) > AXIS_THRESHOLD ) {
                    this.addZoom( zoom, -axes[ 2 ] );
                }

                if ( Math.abs( axes[ 3 ] ) > AXIS_THRESHOLD || Math.abs( axes[ 4 ] ) > AXIS_THRESHOLD ) {
                    this.addRotate( rotate, axes[ 4 ], axes[ 3 ] );
                }
            }

        },

        gamepadbuttondown: function ( event, pressed ) {
            // Buttons 12 to 15 are the d-pad.
            if ( event.button >= 12 && event.button <= 15 ) {
                var pan = this._manipulator.getPanInterpolator();
                var panTarget = pan.getTarget();
                var delta = {
                    12: [ 0, -1 ],
                    13: [ 0, 1 ],
                    14: [ -1, 0 ],
                    15: [ 1, 0 ]
                }[ event.button ];
                pan.setDelay( this._delay );
                pan.setTarget( panTarget[ 0 ] - delta[ 0 ] * 10, panTarget[ 1 ] + delta[ 1 ] * 10 );
            }
        },

        update: function ( gamepadProxyEvent ) {
            if ( !gamepadProxyEvent ) {
                return;
            }

            var gm = gamepadProxyEvent.getGamePad();
            var axis = gm.axes;
            var buttons = gm.buttons;

            this.gamepadaxes( axis );

            // Dummy event wrapper
            var emptyFunc = function () {};
            for ( var i = 0; i < buttons.length; i++ ) {
                if ( buttons[ i ] ) {
                    this.gamepadbuttondown( {
                        preventDefault: emptyFunc,
                        gamepad: gm,
                        button: i
                    }, !! buttons[ i ] );
                }
            }
        }
    };
    return OrbitManipulatorGamePadController;
} );
/*global define */

define( [
    /* #FIXME enum fix 'osgGA/OrbitManipulator' */
], function ( /* #FIXME enum fix OrbitManipulator */) {

    var Mode = {
        Rotate: 0,
        Pan: 1,
        Zoom: 2
    };

    var OrbitManipulatorMouseKeyboardController = function ( manipulator ) {
        this._manipulator = manipulator;
        this.init();
    };

    OrbitManipulatorMouseKeyboardController.prototype = {
        init: function () {
            this.releaseButton();
            this._rotateKey = 65; // a
            this._zoomKey = 83; // s
            this._panKey = 68; // d

            this._mode = undefined;
            this._delay = 0.15;
        },
        getMode: function () {
            return this._mode;
        },
        setMode: function ( mode ) {
            this._mode = mode;
        },
        setEventProxy: function ( proxy ) {
            this._eventProxy = proxy;
        },
        setManipulator: function ( manipulator ) {
            this._manipulator = manipulator;
        },
        mousemove: function ( ev ) {
            if ( this._buttonup === true ) {
                return;
            }
            var pos = this._eventProxy.getPositionRelativeToCanvas( ev );
            var manipulator = this._manipulator;
            if ( isNaN( pos[ 0 ] ) === false && isNaN( pos[ 1 ] ) === false ) {
                var x, y;

                var mode = this.getMode();
                if ( mode === Mode.Rotate ) {
                    manipulator.getRotateInterpolator().setDelay( this._delay );
                    manipulator.getRotateInterpolator().setTarget( pos[ 0 ], pos[ 1 ] );

                } else if ( mode === Mode.Pan ) {
                    manipulator.getPanInterpolator().setTarget( pos[ 0 ], pos[ 1 ] );

                } else if ( mode === Mode.Zoom ) {
                    var zoom = manipulator.getZoomInterpolator();
                    if ( zoom.isReset() ) {
                        zoom._start = pos[ 1 ];
                        zoom.set( 0.0 );
                    }
                    var dy = pos[ 1 ] - zoom._start;
                    zoom._start = pos[ 1 ];
                    var v = zoom.getTarget()[ 0 ];
                    zoom.setTarget( v - dy / 20.0 );
                }
            }

            ev.preventDefault();
        },
        mousedown: function ( ev ) {
            var manipulator = this._manipulator;
            var mode = this.getMode();
            if ( mode === undefined ) {
                if ( ev.button === 0 ) {
                    if ( ev.shiftKey ) {
                        this.setMode( Mode.Pan );
                    } else if ( ev.ctrlKey ) {
                        this.setMode( Mode.Zoom );
                    } else {
                        this.setMode( Mode.Rotate );
                    }
                } else {
                    this.setMode( Mode.Pan );
                }
            }

            this.pushButton();

            var pos = this._eventProxy.getPositionRelativeToCanvas( ev );
            mode = this.getMode();
            //#FIXME enum degueu !!
            if ( mode === 0 /* #FIXME enum fix OrbitManipulator.Rotate */ ) {
                manipulator.getRotateInterpolator().reset();
                manipulator.getRotateInterpolator().set( pos[ 0 ], pos[ 1 ] );
            } else if ( mode === 1 /* #FIXME enum fix OrbitManipulator.Pan */ ) {
                manipulator.getPanInterpolator().reset();
                manipulator.getPanInterpolator().set( pos[ 0 ], pos[ 1 ] );
            } else if ( mode === 2 /* #FIXME enum fix OrbitManipulator.Zoom */ ) {
                manipulator.getZoomInterpolator()._start = pos[ 1 ];
                manipulator.getZoomInterpolator().set( 0.0 );
            }
            ev.preventDefault();
        },
        mouseup: function ( ev ) {
            this.releaseButton();
            this.setMode( undefined );
        },
        mousewheel: function ( ev, intDelta, deltaX, deltaY ) {
            var manipulator = this._manipulator;
            ev.preventDefault();
            var zoomTarget = manipulator.getZoomInterpolator().getTarget()[ 0 ] - intDelta;
            manipulator.getZoomInterpolator().setTarget( zoomTarget );
        },

        pushButton: function () {
            this._buttonup = false;
        },
        releaseButton: function () {
            this._buttonup = true;
        },

        keydown: function ( ev ) {
            if ( ev.keyCode === 32 ) {
                this._manipulator.computeHomePosition();

            } else if ( ev.keyCode === this._panKey &&
                this.getMode() !== Mode.Pan ) {
                this.setMode( Mode.Pan );
                this._manipulator.getPanInterpolator().reset();
                this.pushButton();
                ev.preventDefault();
            } else if ( ev.keyCode === this._zoomKey &&
                this.getMode() !== Mode.Zoom ) {
                this.setMode( Mode.Zoom );
                this._manipulator.getZoomInterpolator().reset();
                this.pushButton();
                ev.preventDefault();
            } else if ( ev.keyCode === this._rotateKey &&
                this.getMode() !== Mode.Rotate ) {
                this.setMode( Mode.Rotate );
                this._manipulator.getRotateInterpolator().reset();
                this.pushButton();
                ev.preventDefault();
            }

        },

        keyup: function ( ev ) {
            if ( ev.keyCode === this._panKey ) {
                this.mouseup( ev );
            } else if ( ev.keyCode === this._rotateKey ) {
                this.mouseup( ev );
            } else if ( ev.keyCode === this._rotateKey ) {
                this.mouseup( ev );
            }
            this.setMode( undefined );
        }

    };
    return OrbitManipulatorMouseKeyboardController;
} );
/*global define */

define( [
    'osg/Notify',
    'osg/Vec3'
], function ( Notify, Vec3 ) {

    var OrbitManipulatorLeapMotionController = function ( manipulator ) {
        this._manipulator = manipulator;
        this.init();
    };

    var ModeConfig = {
        'rotate': {
            dtx: -1.2 * 1.2,
            dty: -0.9 * 1.2,
            dtz: -0.1,
            delay: 0.05,
            method: 'getRotateInterpolator'
        },
        'pan': {
            dtx: -1.2 * 1.2,
            dty: -0.9 * 1.2,
            delay: 0.05,
            method: 'getPanInterpolator'
        },
        'zoom': {
            dtx: 0.0,
            dty: -0.5,
            delay: 0.05,
            method: 'getZoomInterpolator'
        },
        'zoom-twohands': {
            dtx: -0.05,
            dty: 0.0,
            delay: 0.05,
            method: 'getZoomInterpolator'
        }
    };

    OrbitManipulatorLeapMotionController.prototype = {
        init: function () {
            this._virtualCursor = [ 0.0, 0.0 ];
            this._targetPosition = [ 0.0, 0.0 ];
            this._previousFrame = undefined;
            this._displacement = [ 0.0, 0.0 ];
            this._top = [ 0, 1, 0 ];
            this._motion = [ 0.0, 0.0 ];
            this._delay = 0.05;
            this._threshold = 0.08;
            this._direction_dot_threshold = 0.5;
            this._mode = 'rotate';
        },

        update: function ( frame ) {
            if ( !this._previousFrame ) {
                this._previousFrame = frame;
            }

            // no fingers ? return
            if ( frame.fingers.length === 0 ) {
                return;
            }

            var deltaFrame = this._previousFrame.translation( frame );

            this._previousFrame = frame;

            if ( frame.hands.length === 0 ) {
                return;
            }

            // filter noise
            if ( Math.abs( deltaFrame[ 0 ] ) < this._threshold &&
                Math.abs( deltaFrame[ 1 ] ) < this._threshold ) {
                return;
            }

            var mode = this._mode;
            var dist = 0;

            // scale is when there two hands with but with two hand with more than 1 fingers
            if ( frame.gestures.length > 0 ) {
                for ( var i = 0; i < frame.gestures.length; i++ ) {
                    var gesture = frame.gestures[ i ];
                    if ( gesture.type === 'circle' ) {
                        this._manipulator.computeHomePosition();
                        return;
                    }
                }
            }

            if ( frame.hands.length === 1 ) {
                if ( frame.hands[ 0 ].fingers.length >= 3 ) {
                    mode = 'zoom';
                    dist = frame.hands[ 0 ].palmPosition[ 1 ] / 10.0;
                    dist = Math.max( dist - 4, 0.01 );

                } else if ( frame.hands[ 0 ].fingers.length > 1 ) {
                    mode = 'pan';
                } else {
                    // by default onw hand moving means rotation
                    mode = 'rotate';
                }
            } else if ( frame.hands.length === 2 ) {
                var d0 = Math.abs( Vec3.dot( frame.hands[ 0 ].palmNormal, this._top ) ),
                    d1 = Math.abs( Vec3.dot( frame.hands[ 1 ].palmNormal, this._top ) );

                // two hands : zoom
                if ( d0 < this._direction_dot_threshold && d1 < this._direction_dot_threshold ) {
                    mode = 'zoom-twohands';
                } else {
                    // if hands flat do nothing
                    mode = undefined;
                    this.hands_distance_old = undefined;
                }
            }
            var zoom = this._manipulator.getZoomInterpolator();

            if ( mode === undefined ) {
                return;
            }
            // change mode reset counter and skip this frame
            if ( mode !== this._mode ) {
                Notify.info( 'Switch to mode ' + mode );

                this._motion[ 0 ] = 0;
                this._motion[ 1 ] = 0;
                this._mode = mode;

                if ( mode === 'zoom' || mode === 'zoom-twohands' ) {
                    if ( zoom.isReset() ) {
                        zoom._start = 1.0;
                        zoom.set( 0.0 );
                    }
                }
                return;
            }

            var dtx, dty, dtz;
            dtx = ModeConfig[ mode ].dtx;
            dty = ModeConfig[ mode ].dty;
            dtz = ModeConfig[ mode ].dtz;

            this._motion[ 0 ] += deltaFrame[ 0 ] * dtx;
            this._motion[ 1 ] += deltaFrame[ 1 ] * dty;

            var delay = ModeConfig[ mode ].delay;

            // we use the mode enum to get the good method
            var method = ModeConfig[ mode ].method;
            this._manipulator[ method ]().setDelay( delay );

            if ( mode === 'zoom' ) {
                Notify.log( dist );
                zoom.setTarget( dist );
            } else if ( mode === 'zoom-twohands' ) { // two hands zoom
                // distance between two hands
                var hands_distance = Vec3.distance( frame.hands[ 0 ].palmPosition, frame.hands[ 1 ].palmPosition );

                if ( this.hands_distance_old !== undefined ) {
                    // compare distance with lastframe and zoom if they get nearer, unzoom if they separate
                    var vel = dtx * ( hands_distance - this.hands_distance_old );

                    dist = zoom._target;
                    dist[ 0 ] += vel;
                }
                this.hands_distance_old = hands_distance;
            } else {
                if ( mode === 'rotate' ) {
                    dist = zoom._target[ 0 ];
                    dist += deltaFrame[ 2 ] * dtz;
                    dist = Math.max( dist, 0.01 );
                    zoom.setTarget( dist );
                }
                this._manipulator[ method ]().addTarget( this._motion[ 0 ], this._motion[ 1 ] );
            }

            this._motion[ 1 ] = this._motion[ 0 ] = 0;
        }
    };
    return OrbitManipulatorLeapMotionController;
} );
/*global define */

define( [
    'osg/Utils',
    'osg/Vec3',
    'osg/Matrix',
    'osgGA/Manipulator',
    'osgGA/OrbitManipulatorLeapMotionController',
    'osgGA/OrbitManipulatorMouseKeyboardController',
    'osgGA/OrbitManipulatorHammerController',
    'osgGA/OrbitManipulatorGamePadController'
], function ( MACROUTILS, Vec3, Matrix, Manipulator, OrbitManipulatorLeapMotionController, OrbitManipulatorMouseKeyboardController, OrbitManipulatorHammerController, OrbitManipulatorGamePadController ) {

    /** -*- compile-command: "jslint-cli OrbitManipulator.js" -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    /** 
     *  OrbitManipulator
     *  @class
     */
    var OrbitManipulator = function () {
        Manipulator.call( this );
        this._tmpInverse = Matrix.makeIdentity( [] );
        this._tmpHomePosition = Vec3.init( [] );
        this.init();
    };

    OrbitManipulator.Interpolator = function ( size, delay ) {
        this._current = new Array( size );
        this._target = new Array( size );
        this._delta = new Array( size );
        this._delay = ( delay !== undefined ) ? delay : 0.15;
        this._reset = false;
        this.reset();
    };
    OrbitManipulator.Interpolator.prototype = {
        setDelay: function ( delay ) {
            this._delay = delay;
        },
        reset: function () {
            for ( var i = 0, l = this._current.length; i < l; i++ ) {
                this._current[ i ] = this._target[ i ] = 0;
            }
            this._reset = true;
        },
        update: function () {
            for ( var i = 0, l = this._current.length; i < l; i++ ) {
                var d = ( this._target[ i ] - this._current[ i ] ) * this._delay;
                this._delta[ i ] = d;
                this._current[ i ] += d;
            }
            return this._delta;
        },
        set: function () {
            for ( var i = 0, l = this._current.length; i < l; i++ ) {
                this._current[ i ] = this._target[ i ] = arguments[ i ];
            }
            this._reset = false;
        },
        isReset: function () {
            return this._reset;
        },
        getCurrent: function () {
            return this._current;
        },
        setTarget: function () {
            for ( var i = 0, l = this._target.length; i < l; i++ ) {
                if ( this._reset ) {
                    this._target[ i ] = this._current[ i ] = arguments[ i ];
                } else {
                    this._target[ i ] = arguments[ i ];
                }
            }
            this._reset = false;
        },
        addTarget: function () {
            for ( var i = 0; i < arguments.length; i++ ) {
                this._target[ i ] += arguments[ i ];
            }
        },
        getTarget: function () {
            return this._target;
        },
        getDelta: function () {
            return this._delta;
        }
    };

    OrbitManipulator.Rotate = 0;
    OrbitManipulator.Pan = 1;
    OrbitManipulator.Zoom = 2;

    OrbitManipulator.AvailableControllerList = [ 'StandardMouseKeyboard',
        'LeapMotion',
        'GamePad',
        'Hammer'
    ];

    OrbitManipulator.ControllerList = [ 'StandardMouseKeyboard',
        'LeapMotion',
        'GamePad',
        'Hammer'
    ];

    /** @lends OrbitManipulator.prototype */
    OrbitManipulator.prototype = MACROUTILS.objectInehrit( Manipulator.prototype, {
        init: function () {
            this._distance = 25;
            this._target = new Array( 3 );
            Vec3.init( this._target );

            this._rotation = Matrix.mult( Matrix.makeRotate( Math.PI, 0, 0, 1, [] ), Matrix.makeRotate( -Math.PI / 10.0, 1, 0, 0, [] ), [] );
            this._time = 0.0;

            this._rotate = new OrbitManipulator.Interpolator( 2 );
            this._pan = new OrbitManipulator.Interpolator( 2 );
            this._zoom = new OrbitManipulator.Interpolator( 1 );
            this._zoom.reset = function () {
                OrbitManipulator.Interpolator.prototype.reset.call( this );
                this._start = 0.0;
            };

            this._buttonup = true;

            this._scale = 10.0;
            this._maxDistance = 0;
            this._minDistance = 0;
            this._scaleMouseMotion = 1.0;

            this._inverseMatrix = new Array( 16 );
            this._rotateKey = 65; // a
            this._zoomKey = 83; // s
            this._panKey = 68; // d

            // instance of controller
            var self = this;

            OrbitManipulator.ControllerList.forEach( function ( value ) {
                if ( OrbitManipulator[ value ] !== undefined ) {
                    self._controllerList[ value ] = new OrbitManipulator[ value ]( self );
                }
            } );
        },
        reset: function () {
            this.init();
        },
        setNode: function ( node ) {
            this._node = node;
        },
        setTarget: function ( target ) {
            Vec3.copy( target, this._target );
            var eyePos = new Array( 3 );
            this.getEyePosition( eyePos );
            this._distance = Vec3.distance( eyePos, target );
        },
        setEyePosition: function ( eye ) {
            var result = this._rotation;
            var center = this._target;
            var up = [ 0, 0, 1 ];

            var f = Vec3.sub( eye, center, [] );
            Vec3.normalize( f, f );

            var s = Vec3.cross( f, up, [] );
            Vec3.normalize( s, s );

            var u = Vec3.cross( s, f, [] );
            Vec3.normalize( u, u );

            // s[0], f[0], u[0], 0.0,
            // s[1], f[1], u[1], 0.0,
            // s[2], f[2], u[2], 0.0,
            // 0,    0,    0,     1.0
            result[ 0 ] = s[ 0 ];
            result[ 1 ] = f[ 0 ];
            result[ 2 ] = u[ 0 ];
            result[ 3 ] = 0.0;
            result[ 4 ] = s[ 1 ];
            result[ 5 ] = f[ 1 ];
            result[ 6 ] = u[ 1 ];
            result[ 7 ] = 0.0;
            result[ 8 ] = s[ 2 ];
            result[ 9 ] = f[ 2 ];
            result[ 10 ] = u[ 2 ];
            result[ 11 ] = 0.0;
            result[ 12 ] = 0;
            result[ 13 ] = 0;
            result[ 14 ] = 0;
            result[ 15 ] = 1.0;

            this._distance = Vec3.distance( eye, center );
        },
        computeHomePosition: function () {
            if ( this._node !== undefined ) {
                //this.reset();
                var bs = this._node.getBound();
                this.setDistance( bs.radius() * 1.5 );
                this.setTarget( bs.center() );
            }
        },

        getHomePosition: function () {
            var eyePos = this._tmpHomePosition;
            if ( this._node !== undefined ) {

                var bs = this._node.getBound();
                var distance = bs.radius() * 1.5;

                var target = bs.center();

                this.computeEyePosition( target, distance, eyePos );
            }
            return eyePos;
        },

        setMaxDistance: function ( d ) {
            this._maxDistance = d;
        },
        setMinDistance: function ( d ) {
            this._minDistance = d;
        },
        setDistance: function ( d ) {
            this._distance = d;
        },
        getDistance: function () {
            return this._distance;
        },
        computePan: function ( dx, dy ) {
            dy *= this._distance;
            dx *= this._distance;

            var inv = new Array( 16 );
            var x = new Array( 3 );
            var y = new Array( 3 );
            Matrix.inverse( this._rotation, inv );
            x[ 0 ] = Matrix.get( inv, 0, 0 );
            x[ 1 ] = Matrix.get( inv, 0, 1 );
            x[ 2 ] = Matrix.get( inv, 0, 2 );
            Vec3.normalize( x, x );

            y[ 0 ] = Matrix.get( inv, 2, 0 );
            y[ 1 ] = Matrix.get( inv, 2, 1 );
            y[ 2 ] = Matrix.get( inv, 2, 2 );
            Vec3.normalize( y, y );

            Vec3.mult( x, -dx, x );
            Vec3.mult( y, dy, y );
            Vec3.add( this._target, x, this._target );
            Vec3.add( this._target, y, this._target );
        },

        computeRotation: function ( dx, dy ) {
            var of = Matrix.makeRotate( dx / 10.0, 0, 0, 1, [] );
            var r = Matrix.mult( this._rotation, of, [] );

            of = Matrix.makeRotate( dy / 10.0, 1, 0, 0, [] );
            var r2 = Matrix.mult( of, r, [] );

            // test that the eye is not too up and not too down to not kill
            // the rotation matrix
            var inv = [];
            Matrix.inverse( r2, inv );
            var eye = Matrix.transformVec3( inv, [ 0, this._distance, 0 ], new Array( 3 ) );

            var dir = Vec3.neg( eye, [] );
            Vec3.normalize( dir, dir );

            var p = Vec3.dot( dir, [ 0, 0, 1 ] );
            if ( Math.abs( p ) > 0.95 ) {
                //discard rotation on y
                this._rotation = r;
                return;
            }
            this._rotation = r2;
        },

        computeZoom: function ( dz ) {
            this.zoom( dz );
        },

        zoom: function ( ratio ) {
            var newValue = this._distance * ratio;
            if ( this._minDistance > 0 ) {
                if ( newValue < this._minDistance ) {
                    newValue = this._minDistance;
                }
            }
            if ( this._maxDistance > 0 ) {
                if ( newValue > this._maxDistance ) {
                    newValue = this._maxDistance;
                }
            }
            this._distance = newValue;
        },

        getRotateInterpolator: function () {
            return this._rotate;
        },
        getPanInterpolator: function () {
            return this._pan;
        },
        getZoomInterpolator: function () {
            return this._zoom;
        },
        getTarget: function ( target ) {
            Vec3.copy( this._target, target );
            return target;
        },
        getEyePosition: function ( eye ) {
            this.computeEyePosition( this._target, this._distance, eye );
        },

        computeEyePosition: function ( target, distance, eye ) {
            var inv = this._tmpInverse;
            Matrix.inverse( this._rotation, this._tmpInverse );
            Matrix.transformVec3( inv, [ 0, distance, 0 ],
                eye );
            Vec3.add( target, eye, eye );
        },

        update: function ( nv ) {
            var t = nv.getFrameStamp().getSimulationTime();
            if ( this._lastUpdate === undefined ) {
                this._lastUpdate = t;
            }
            var dt = t - this._lastUpdate;
            this._lastUpdate = t;

            var delta;
            var mouseFactor = 0.1;
            delta = this._rotate.update();
            this.computeRotation( -delta[ 0 ] * mouseFactor * this._scaleMouseMotion, -delta[ 1 ] * mouseFactor * this._scaleMouseMotion );


            var panFactor = 0.002;
            delta = this._pan.update();
            this.computePan( -delta[ 0 ] * panFactor, -delta[ 1 ] * panFactor );


            delta = this._zoom.update();
            this.computeZoom( 1.0 + delta[ 0 ] / 10.0 );

            var target = this._target;
            var distance = this._distance;

            var eye = new Array( 3 );
            Matrix.inverse( this._rotation, this._inverseMatrix );
            Matrix.transformVec3( this._inverseMatrix, [ 0, distance, 0 ],
                eye );

            Matrix.makeLookAt( Vec3.add( target, eye, eye ),
                target, [ 0, 0, 1 ],
                this._inverseMatrix );
        },

        getInverseMatrix: function () {
            return this._inverseMatrix;
        }
    } );

    ( function ( module ) {
        module.LeapMotion = OrbitManipulatorLeapMotionController;
    } )( OrbitManipulator );


    ( function ( module ) {
        module.StandardMouseKeyboard = OrbitManipulatorMouseKeyboardController;
    } )( OrbitManipulator );


    ( function ( module ) {
        module.Hammer = OrbitManipulatorHammerController;
    } )( OrbitManipulator );

    ( function ( module ) {
        module.GamePad = OrbitManipulatorGamePadController;
    } )( OrbitManipulator );

    return OrbitManipulator;
} );
/*global define */

define( [], function () {

    var FirstPersonManipulatorMouseKeyboardController = function ( manipulator ) {
        this._manipulator = manipulator;
        this.init();
    };

    FirstPersonManipulatorMouseKeyboardController.prototype = {
        init: function () {
            this.releaseButton();
            this._delay = 0.15;
            this._stepFactor = 1.0; // meaning radius*stepFactor to move
        },
        setEventProxy: function ( proxy ) {
            this._eventProxy = proxy;
        },
        setManipulator: function ( manipulator ) {
            this._manipulator = manipulator;

            // we always want to sync speed of controller with manipulator
            this._manipulator.setStepFactor( this._stepFactor );
        },

        pushButton: function () {
            this._buttonup = false;
        },
        releaseButton: function () {
            this._buttonup = true;
        },

        mousedown: function ( ev ) {
            var pos = this._eventProxy.getPositionRelativeToCanvas( ev );
            var manipulator = this._manipulator;
            manipulator.getLookPositionInterpolator().set( pos[ 0 ], pos[ 1 ] );
            this.pushButton();
        },
        mouseup: function ( ev ) {
            this.releaseButton();
        },
        mousemove: function ( ev ) {
            if ( this._buttonup === true ) {
                return;
            }

            var curX;
            var curY;
            var deltaX;
            var deltaY;
            var pos = this._eventProxy.getPositionRelativeToCanvas( ev );
            this._manipulator.getLookPositionInterpolator().setDelay( this._delay );
            this._manipulator.getLookPositionInterpolator().setTarget( pos[ 0 ], pos[ 1 ] );
        },
        mousewheel: function ( ev, intDelta, deltaX, deltaY ) {
            ev.preventDefault();
            this._stepFactor = Math.min( Math.max( 0.001, this._stepFactor + intDelta * 0.01 ), 4.0 );
            this._manipulator.setStepFactor( this._stepFactor );
        },

        keydown: function ( event ) {
            var manipulator = this._manipulator;
            if ( event.keyCode === 32 ) {
                manipulator.computeHomePosition();
            } else if ( event.keyCode === 87 || event.keyCode === 90 || event.keyCode === 38 ) { // w/z/up
                manipulator.getFowardInterpolator().setDelay( this._delay );
                manipulator.getFowardInterpolator().setTarget( 1 );
                return false;
            } else if ( event.keyCode === 83 || event.keyCode === 40 ) { // S/down
                manipulator.getFowardInterpolator().setDelay( this._delay );
                manipulator.getFowardInterpolator().setTarget( -1 );
                return false;
            } else if ( event.keyCode === 68 || event.keyCode === 39 ) { // D/right
                manipulator.getSideInterpolator().setDelay( this._delay );
                manipulator.getSideInterpolator().setTarget( 1 );
                return false;
            } else if ( event.keyCode === 65 || event.keyCode === 81 || event.keyCode === 37 ) { // a/q/left
                manipulator.getSideInterpolator().setDelay( this._delay );
                manipulator.getSideInterpolator().setTarget( -1 );
                return false;
            }
        },

        keyup: function ( event ) {
            var manipulator = this._manipulator;
            if ( event.keyCode === 87 || event.keyCode === 90 || event.keyCode === 38 || // w/z/up
                event.keyCode == 83 || event.keyCode === 40 ) { // S/down
                manipulator.getFowardInterpolator().setDelay( this._delay );
                manipulator.getFowardInterpolator().setTarget( 0 );
                return false;
            } else if ( event.keyCode == 68 || event.keyCode === 39 || // D/right
                event.keyCode === 65 || event.keyCode === 81 || event.keyCode === 37 ) { // a/q/left
                manipulator.getSideInterpolator().setDelay( this._delay );
                manipulator.getSideInterpolator().setTarget( 0 );
                return false;
            }
        }

    };

    return FirstPersonManipulatorMouseKeyboardController;
} );
/*global define */

define( [
    'osg/Utils',
    'osgGA/Manipulator',
    'osgGA/OrbitManipulator',
    'osg/Matrix',
    'osg/Vec2',
    'osg/Vec3',
    'osgGA/FirstPersonManipulatorMouseKeyboardController'
], function ( MACROUTILS, Manipulator, OrbitManipulator, Matrix, Vec2, Vec3, FirstPersonManipulatorMouseKeyboardController ) {

    /** -*- compile-command: "jslint-cli FirstPersonManipulator.js" -*-
     * Authors:
     *  Matt Fontaine <tehqin@gmail.com>
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    /** 
     *  FirstPersonManipulator
     *  @class
     */
    var FirstPersonManipulator = function () {
        Manipulator.call( this );
        this.init();
    };

    FirstPersonManipulator.AvailableControllerList = [ 'StandardMouseKeyboard' ];
    FirstPersonManipulator.ControllerList = [ 'StandardMouseKeyboard' ];

    /** @lends FirstPersonManipulator.prototype */
    FirstPersonManipulator.prototype = MACROUTILS.objectInehrit( Manipulator.prototype, {
        setNode: function ( node ) {
            this._node = node;
            this.computeHomePosition();
        },
        computeHomePosition: function () {
            if ( this._node !== undefined ) {
                var bs = this._node.getBound();
                this._radius = bs.radius();
                this._eye = [ 0, -bs.radius() * 1.5, 0 ];
            }
        },
        init: function () {
            this._direction = [ 0.0, 1.0, 0.0 ];
            this._eye = [ 0.0, 25.0, 10.0 ];
            this._up = [ 0.0, 0.0, 1.0 ];
            this._radius = 1.0;
            this._forward = new OrbitManipulator.Interpolator( 1 );
            this._side = new OrbitManipulator.Interpolator( 1 );
            this._lookPosition = new OrbitManipulator.Interpolator( 2 );
            this._stepFactor = 1.0; // meaning radius*stepFactor to move
            this._target = new Array( 3 );
            Vec3.init( this._target );
            this._angleVertical = 0.0;
            this._angleHorizontal = 0.0;

            // tmp value use for computation
            this._tmpComputeRotation1 = Matrix.makeIdentity( [] );
            this._tmpComputeRotation2 = Matrix.makeIdentity( [] );
            this._tmpComputeRotation3 = Matrix.makeIdentity( [] );
            this._tmpGetTargetDir = Vec3.init( [] );

            var self = this;

            this._controllerList = {};
            FirstPersonManipulator.ControllerList.forEach( function ( value ) {
                if ( FirstPersonManipulator[ value ] !== undefined ) {
                    self._controllerList[ value ] = new FirstPersonManipulator[ value ]( self );
                }
            } );

        },

        getEyePosition: function ( eye ) {
            eye[ 0 ] = this._eye[ 0 ];
            eye[ 1 ] = this._eye[ 1 ];
            eye[ 2 ] = this._eye[ 2 ];
            return eye;
        },

        setEyePosition: function ( eye ) {
            this._eye[ 0 ] = eye[ 0 ];
            this._eye[ 1 ] = eye[ 1 ];
            this._eye[ 2 ] = eye[ 2 ];
            return this;
        },

        getTarget: function ( pos, distance ) {
            if ( distance === undefined ) {
                distance = 25;
            }
            var dir = Vec3.mult( this._direction, distance, this._tmpGetTargetDir );
            Vec3.add( this._eye, dir, pos );
        },

        setTarget: function ( pos ) {
            this._target[ 0 ] = pos[ 0 ];
            this._target[ 1 ] = pos[ 1 ];
            this._target[ 2 ] = pos[ 2 ];
            var dir = this._tmpGetTargetDir;
            Vec3.sub( pos, this._eye, dir );
            dir[ 2 ] = 0;
            Vec3.normalize( dir, dir );
            this._angleHorizontal = Math.acos( dir[ 1 ] );
            if ( dir[ 0 ] < 0 ) {
                this._angleHorizontal = -this._angleHorizontal;
            }
            Vec3.sub( pos, this._eye, dir );
            Vec3.normalize( dir, dir );

            this._angleVertical = -Math.asin( dir[ 2 ] );
            Vec3.copy( dir, this._direction );
        },

        getLookPositionInterpolator: function () {
            return this._lookPosition;
        },
        getSideInterpolator: function () {
            return this._side;
        },
        getFowardInterpolator: function () {
            return this._forward;
        },

        computeRotation: function ( dx, dy ) {
            this._angleVertical += dy * 0.01;
            this._angleHorizontal -= dx * 0.01;

            var first = this._tmpComputeRotation1;
            var second = this._tmpComputeRotation2;
            var rotMat = this._tmpComputeRotation3;
            Matrix.makeRotate( this._angleVertical, 1, 0, 0, first );
            Matrix.makeRotate( this._angleHorizontal, 0, 0, 1, second );
            Matrix.mult( second, first, rotMat );

            this._direction = Matrix.transformVec3( rotMat, [ 0, 1, 0 ], this._direction );
            Vec3.normalize( this._direction, this._direction );

            this._up = Matrix.transformVec3( rotMat, [ 0, 0, 1 ], this._up );
        },

        reset: function () {
            this.init();
        },

        setStepFactor: function ( t ) {
            this._stepFactor = t;
        },

        update: function ( nv ) {
            var t = nv.getFrameStamp().getSimulationTime();
            if ( this._lastUpdate === undefined ) {
                this._lastUpdate = t;
            }
            var dt = t - this._lastUpdate;
            this._lastUpdate = t;

            this._forward.update();
            this._side.update();
            var delta = this._lookPosition.update();

            this.computeRotation( -delta[ 0 ] * 0.5, -delta[ 1 ] * 0.5 );

            var vec = new Array( 2 );
            vec[ 0 ] = this._forward.getCurrent()[ 0 ];
            vec[ 1 ] = this._side.getCurrent()[ 0 ];
            if ( Vec2.length( vec ) > 1.0 ) {
                Vec2.normalize( vec, vec );
            }
            var factor = this._radius;
            if ( this._radius < 1e-3 ) {
                factor = 1.0;
            }
            this.moveForward( vec[ 0 ] * factor * this._stepFactor * dt );
            this.strafe( vec[ 1 ] * factor * this._stepFactor * dt );

            var target = Vec3.add( this._eye, this._direction, [] );
            this._target = target;

            Matrix.makeLookAt( this._eye, target, this._up, this._inverseMatrix );
        },

        getInverseMatrix: function () {
            return this._inverseMatrix;
        },

        moveForward: function ( distance ) {
            var d = Vec3.mult( Vec3.normalize( this._direction, [] ), distance, [] );
            this._eye = Vec3.add( this._eye, d, [] );
        },

        strafe: function ( distance ) {
            var cx = Vec3.cross( this._direction, this._up, [] );
            var d = Vec3.mult( Vec3.normalize( cx, cx ), distance, [] );
            this._eye = Vec3.add( this._eye, d, [] );
        }

    } );

    ( function ( module ) {
        module.StandardMouseKeyboard = FirstPersonManipulatorMouseKeyboardController;
    } )( FirstPersonManipulator );

    return FirstPersonManipulator.
} );
/*global define */

define( [
    'osg/Notify'
], function ( Notify ) {

    /** -*- compile-command: "jslint-cli SwitchManipulator.js" -*-
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     */

    /** 
     *  OrbitManipulator
     *  @class
     */
    var SwitchManipulator = function () {
        this._manipulatorList = [];
        this._currentManipulator = undefined;
    };

    /** @lends SwitchManipulator.prototype */
    SwitchManipulator.prototype = {
        update: function ( nv ) {
            var manipulator = this.getCurrentManipulator();
            if ( manipulator !== undefined ) {
                return manipulator.update( nv );
            }
        },
        setNode: function ( node ) {
            var manipulator = this.getCurrentManipulator();
            if ( manipulator.setNode === undefined ) {
                Notify.log( "manipulator has not setNode method" );
                return;
            }
            manipulator.setNode( node );
        },
        getControllerList: function () {
            return this.getCurrentManipulator().getControllerList();
        },
        getNumManipulator: function () {
            return this._manipulatorList.length;
        },
        addManipulator: function ( manipulator ) {
            this._manipulatorList.push( manipulator );
            if ( this._currentManipulator === undefined ) {
                this.setManipulatorIndex( 0 );
            }
        },
        getManipulatorList: function () {
            return this._manipulatorList;
        },
        setManipulatorIndex: function ( index ) {
            this._currentManipulator = index;
        },
        getCurrentManipulatorIndex: function () {
            return this._currentManipulator;
        },
        getCurrentManipulator: function () {
            var manipulator = this._manipulatorList[ this._currentManipulator ];
            return manipulator;
        },
        reset: function () {
            this.getCurrentManipulator().reset();
        },
        computeHomePosition: function () {
            var manipulator = this.getCurrentManipulator();
            if ( manipulator !== undefined ) {
                manipulator.computeHomePosition();
            }
        },
        getInverseMatrix: function () {
            var manipulator = this.getCurrentManipulator();
            if ( manipulator !== undefined ) {
                return manipulator.getInverseMatrix();
            }
        }
    };

    return SwitchManipulator;
} );
/*global define */

define( [
    'vendors/Q'
], function ( Q ) {

    /** -*- compile-command: "jslint-cli osg.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */

    var Object = function ( input, obj ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            return true;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        if ( jsonObj.Name ) {
            obj.setName( jsonObj.Name );
        }

        if ( jsonObj.UserDataContainer ) {
            var userdata = input.setJSON( jsonObj.UserDataContainer ).readUserDataContainer();
            if ( userdata !== undefined ) {
                obj.setUserData( userdata );
            }
        }

        return obj;
    };

    var Node = function ( input, node ) {
        var jsonObj = input.getJSON();

        var check = function ( o ) {
            return true;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        Object( input, node );

        var promiseArray = [];

        var createCallback = function ( jsonCallback ) {
            var promise = input.setJSON( jsonCallback ).readObject();
            var df = Q.defer();
            promiseArray.push( df.promise );
            Q.when( promise ).then( function ( cb ) {
                if ( cb ) {
                    node.addUpdateCallback( cb );
                }
                df.resolve();
            } );
        };

        if ( jsonObj.UpdateCallbacks ) {
            for ( var j = 0, l = jsonObj.UpdateCallbacks.length; j < l; j++ ) {
                createCallback( jsonObj.UpdateCallbacks[ j ] );
            }
        }


        if ( jsonObj.StateSet ) {
            var pp = input.setJSON( jsonObj.StateSet ).readObject();
            var df = Q.defer();
            promiseArray.push( df.promise );
            Q.when( pp ).then( function ( stateset ) {
                node.setStateSet( stateset );
                df.resolve();
            } );
        }

        var createChildren = function ( jsonChildren ) {
            var promise = input.setJSON( jsonChildren ).readObject();
            var df = Q.defer();
            promiseArray.push( df.promise );
            Q.when( promise ).then( function ( obj ) {
                if ( obj ) {
                    node.addChild( obj );
                }
                df.resolve( obj );
            } );
        };

        if ( jsonObj.Children ) {
            for ( var i = 0, k = jsonObj.Children.length; i < k; i++ ) {
                createChildren( jsonObj.Children[ i ] );
            }
        }

        var defer = Q.defer();
        Q.all( promiseArray ).then( function () {
            defer.resolve( node );
        } );

        return defer.promise;
    };

    var StateSet = function ( input, stateSet ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            return true;
        };

        if ( !check( jsonObj ) ) {
            return;
        }

        Object( input, stateSet );

        if ( jsonObj.RenderingHint !== undefined ) {
            stateSet.setRenderingHint( jsonObj.RenderingHint );
        }

        var createAttribute = function ( jsonAttribute ) {
            var promise = input.setJSON( jsonAttribute ).readObject();
            var df = Q.defer();
            promiseArray.push( df.promise );
            Q.when( promise ).then( function ( attribute ) {
                if ( attribute !== undefined ) {
                    stateSet.setAttributeAndMode( attribute );
                }
                df.resolve();
            } );
        };

        var promiseArray = [];

        if ( jsonObj.AttributeList !== undefined ) {
            for ( var i = 0, l = jsonObj.AttributeList.length; i < l; i++ ) {
                createAttribute( jsonObj.AttributeList[ i ] );
            }
        }

        var createTextureAttribute = function ( unit, textureAttribute ) {
            var promise = input.setJSON( textureAttribute ).readObject();
            var df = Q.defer();
            promiseArray.push( df.promise );
            Q.when( promise ).then( function ( attribute ) {
                if ( attribute )
                    stateSet.setTextureAttributeAndMode( unit, attribute );
                df.resolve();
            } );
        };

        if ( jsonObj.TextureAttributeList ) {
            var textures = jsonObj.TextureAttributeList;
            for ( var t = 0, lt = textures.length; t < lt; t++ ) {
                var textureAttributes = textures[ t ];
                for ( var a = 0, al = textureAttributes.length; a < al; a++ ) {
                    createTextureAttribute( t, textureAttributes[ a ] );
                }
            }
        }

        var defer = Q.defer();
        Q.all( promiseArray ).then( function () {
            defer.resolve( stateSet );
        } );

        return defer.promise;
    };

    var Material = function ( input, material ) {
        var jsonObj = input.getJSON();

        var check = function ( o ) {
            if ( o.Diffuse !== undefined &&
                o.Emission !== undefined &&
                o.Specular !== undefined &&
                o.Shininess !== undefined ) {
                return true;
            }
            return false;
        };

        if ( !check( jsonObj ) ) {
            return;
        }

        Object( input, material );

        material.setAmbient( jsonObj.Ambient );
        material.setDiffuse( jsonObj.Diffuse );
        material.setEmission( jsonObj.Emission );
        material.setSpecular( jsonObj.Specular );
        material.setShininess( jsonObj.Shininess );
        return material;
    };

    var BlendFunc = function ( input, blend ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            if ( o.SourceRGB && o.SourceAlpha && o.DestinationRGB && o.DestinationAlpha ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        Object( input, blend );

        blend.setSourceRGB( jsonObj.SourceRGB );
        blend.setSourceAlpha( jsonObj.SourceAlpha );
        blend.setDestinationRGB( jsonObj.DestinationRGB );
        blend.setDestinationAlpha( jsonObj.DestinationAlpha );
        return blend;
    };

    var CullFace = function ( input, attr ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            if ( o.Mode !== undefined ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        Object( input, attr );
        attr.setMode( jsonObj.Mode );
        return attr;
    };

    var BlendColor = function ( input, attr ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            if ( o.ConstantColor !== undefined ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        Object( input, attr );
        attr.setConstantColor( jsonObj.ConstantColor );
        return attr;
    };

    var Light = function ( input, light ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            if ( o.LightNum !== undefined &&
                o.Ambient !== undefined &&
                o.Diffuse !== undefined &&
                o.Direction !== undefined &&
                o.Position !== undefined &&
                o.Specular !== undefined &&
                o.SpotCutoff !== undefined &&
                o.LinearAttenuation !== undefined &&
                o.ConstantAttenuation !== undefined &&
                o.QuadraticAttenuation !== undefined ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        Object( input, light );
        light.setAmbient( jsonObj.Ambient );
        light.setConstantAttenuation( jsonObj.ConstantAttenuation );
        light.setDiffuse( jsonObj.Diffuse );
        light.setDirection( jsonObj.Direction );
        light.setLightNumber( jsonObj.LightNum );
        light.setLinearAttenuation( jsonObj.LinearAttenuation );
        light.setPosition( jsonObj.Position );
        light.setQuadraticAttenuation( jsonObj.QuadraticAttenuation );
        light.setSpecular( jsonObj.Specular );
        light.setSpotCutoff( jsonObj.SpotCutoff );
        light.setSpotBlend( 0.01 );
        if ( jsonObj.SpotExponent !== undefined ) {
            light.setSpotBlend( jsonObj.SpotExponent / 128.0 );
        }
        return light;
    };

    var Texture = function ( input, texture ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            return true;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        Object( input, texture );

        if ( jsonObj.MinFilter !== undefined ) {
            texture.setMinFilter( jsonObj.MinFilter );
        }
        if ( jsonObj.MagFilter !== undefined ) {
            texture.setMagFilter( jsonObj.MagFilter );
        }

        if ( jsonObj.WrapT !== undefined ) {
            texture.setWrapT( jsonObj.WrapT );
        }
        if ( jsonObj.WrapS !== undefined ) {
            texture.setWrapS( jsonObj.WrapS );
        }

        // no file return dummy texture
        var file = jsonObj.File;
        if ( file === undefined ) {
            file = "no-image-provided";
        }

        var defer = Q.defer();
        Q.when( input.readImageURL( file ) ).then(
            function ( img ) {
                texture.setImage( img );
                defer.resolve( texture );
            } );
        return defer.promise;
    };

    var Projection = function ( input, node ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            if ( o.Matrix !== undefined ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        var promise = Node( input, node );

        if ( jsonObj.Matrix !== undefined ) {
            node.setMatrix( jsonObj.Matrix );
        }
        return promise;
    };

    var MatrixTransform = function ( input, node ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            if ( o.Matrix ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        var promise = Node( input, node );

        if ( jsonObj.Matrix !== undefined ) {
            node.setMatrix( jsonObj.Matrix );
        }
        return promise;
    };

    var LightSource = function ( input, node ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            if ( o.Light !== undefined ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        var defer = Q.defer();
        var promise = Node( input, node );
        Q.all( [ input.setJSON( jsonObj.Light ).readObject(), promise ] ).then( function ( args ) {
            var light = args[ 0 ];
            var lightsource = args[ 1 ];
            node.setLight( light );
            defer.resolve( node );
        } );
        return defer.promise;
    };

    var Geometry = function ( input, node ) {
        var jsonObj = input.getJSON();
        var check = function ( o ) {
            if ( o.PrimitiveSetList !== undefined && o.VertexAttributeList !== undefined ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        var arraysPromise = [];
        arraysPromise.push( Node( input, node ) );

        var createPrimitive = function ( jsonPrimitive ) {
            var defer = Q.defer();
            arraysPromise.push( defer.promise );
            var promise = input.setJSON( jsonPrimitive ).readPrimitiveSet();
            Q.when( promise ).then( function ( primitiveSet ) {
                if ( primitiveSet !== undefined ) {
                    node.getPrimitives().push( primitiveSet );
                }
                defer.resolve( primitiveSet );
            } );
        };

        for ( var i = 0, l = jsonObj.PrimitiveSetList.length; i < l; i++ ) {
            var entry = jsonObj.PrimitiveSetList[ i ];
            createPrimitive( entry );
        }

        var createVertexAttribute = function ( name, jsonAttribute ) {
            var defer = Q.defer();
            arraysPromise.push( defer.promise );
            var promise = input.setJSON( jsonAttribute ).readBufferArray();
            Q.when( promise ).then( function ( buffer ) {
                if ( buffer !== undefined ) {
                    node.getVertexAttributeList()[ name ] = buffer;
                }
                defer.resolve( buffer );
            } );
        };
        for ( var key in jsonObj.VertexAttributeList ) {
            if ( jsonObj.VertexAttributeList.hasOwnProperty( key ) ) {
                createVertexAttribute( key, jsonObj.VertexAttributeList[ key ] );
            }
        }

        var defer = Q.defer();
        Q.all( arraysPromise ).then( function () {
            defer.resolve( node );
        } );
        return defer.promise;
    };

    return {
        Object: Object,
        Node: Node,
        StateSet: StateSet,
        Material: Material,
        BlendFunc: BlendFunc,
        CullFace: CullFace,
        BlendColor: BlendColor,
        Light: Light,
        Texture: Texture,
        Projection: Projection,
        MatrixTransform: MatrixTransform,
        LightSource: LightSource,
        Geometry: Geometry
    };
} );
/*global define */

define( [
    'osg/Notify',
    'vendors/Q',
    'osgWrappers/serializers/osg'
], function ( Notify, Q, osgSerializer ) {

    /** -*- compile-command: "jslint-cli osgAnimation.js" -*-
     *
     *  Copyright (C) 2010-2011 Cedric Pinson
     *
     *                  GNU LESSER GENERAL PUBLIC LICENSE
     *                      Version 3, 29 June 2007
     *
     * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
     * Everyone is permitted to copy and distribute verbatim copies
     * of this license document, but changing it is not allowed.
     *
     * This version of the GNU Lesser General Public License incorporates
     * the terms and conditions of version 3 of the GNU General Public
     * License
     *
     * Authors:
     *  Cedric Pinson <cedric.pinson@plopbyte.com>
     *
     */

    var Animation = function ( input, animation ) {
        var jsonObj = input.getJSON();
        // check
        // 
        var check = function ( o ) {
            if ( o.Name && o.Channels && o.Channels.length > 0 ) {
                return true;
            }
            if ( !o.Name ) {
                Notify.log( "animation has field Name, error" );
                return false;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        if ( !osgSerializer.Object( input, animation ) ) {
            return;
        }

        // channels
        for ( var i = 0, l = jsonObj.Channels.length; i < l; i++ ) {
            Q.when( input.setJSON( jsonObj.Channels[ i ] ).readObject() ).then( function ( channel ) {
                if ( channel ) {
                    animation.getChannels().push( channel );
                }
            } );
        }
        return animation;
    };

    osgDB.ObjectWrapper.serializers.osgAnimation.Vec3LerpChannel = function ( input, channel ) {
        var jsonObj = input.getJSON();
        // check
        // 
        var check = function ( o ) {
            if ( o.KeyFrames && o.TargetName && o.Name ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        // doit
        if ( !osgDB.ObjectWrapper.serializers.osg.Object( input, channel ) ) {
            return;
        }

        channel.setTargetName( jsonObj.TargetName );

        // channels
        var keys = channel.getSampler().getKeyframes();
        for ( var i = 0, l = jsonObj.KeyFrames.length; i < l; i++ ) {
            var nodekey = jsonObj.KeyFrames[ i ];
            var mykey = nodekey.slice( 1 );
            mykey.t = nodekey[ 0 ];
            keys.push( mykey );
        }
        return channel;
    };


    osgDB.ObjectWrapper.serializers.osgAnimation.QuatLerpChannel = function ( input, channel ) {
        return osgDB.ObjectWrapper.serializers.osgAnimation.Vec3LerpChannel( input, channel );
    };

    osgDB.ObjectWrapper.serializers.osgAnimation.QuatSlerpChannel = function ( input, channel ) {
        return osgDB.ObjectWrapper.serializers.osgAnimation.Vec3LerpChannel( input, channel );
    };


    osgDB.ObjectWrapper.serializers.osgAnimation.FloatLerpChannel = function ( input, channel ) {
        var jsonObj = input.getJSON();
        // check
        // 
        var check = function ( o ) {
            if ( o.KeyFrames && o.TargetName && o.Name ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        // doit
        if ( !osgDB.ObjectWrapper.serializers.osg.Object( input, channel ) ) {
            return;
        }

        channel.setTargetName( jsonObj.TargetName );

        // channels
        var keys = channel.getSampler().getKeyframes();
        for ( var i = 0, l = jsonObj.KeyFrames.length; i < l; i++ ) {
            var nodekey = jsonObj.KeyFrames[ i ];
            var mykey = nodekey.slice( 1 );
            mykey.t = nodekey[ 0 ];
            keys.push( mykey );
        }
        return channel;
    };



    osgDB.ObjectWrapper.serializers.osgAnimation.BasicAnimationManager = function ( input, manager ) {
        var jsonObj = input.getJSON();
        // check
        // 
        var check = function ( o ) {
            if ( o.Animations ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        for ( var i = 0, l = jsonObj.Animations.length; i < l; i++ ) {
            var entry = jsonObj.Animations[ i ];
            var anim = input.setJSON( entry ).readObject();
            if ( anim ) {
                manager.registerAnimation( anim );
            }
        }
        return manager;
    };


    osgDB.ObjectWrapper.serializers.osgAnimation.UpdateMatrixTransform = function ( input, umt ) {
        var jsonObj = input.getJSON();
        // check
        var check = function ( o ) {
            if ( o.Name && o.StackedTransforms ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        if ( osgDB.ObjectWrapper.serializers.osg.Object( input, umt ) === undefined ) {
            return;
        }

        for ( var i = 0, l = jsonObj.StackedTransforms.length; i < l; i++ ) {
            var entry = jsonObj.StackedTransforms[ i ];
            var ste = input.setJSON( entry ).readObject();
            if ( ste ) {
                umt.getStackedTransforms().push( ste );
            }
        }
        return umt;
    };


    osgDB.ObjectWrapper.serializers.osgAnimation.StackedTranslate = function ( input, st ) {
        var jsonObj = input.getJSON();

        // check
        var check = function ( o ) {
            if ( o.Name ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        if ( !osgDB.ObjectWrapper.serializers.osg.Object( input, st ) ) {
            return;
        }

        if ( jsonObj.Translate ) {
            st.setTranslate( jsonObj.Translate );
        }
        return st;
    };


    osgDB.ObjectWrapper.serializers.osgAnimation.StackedQuaternion = function ( input, st ) {
        var jsonObj = input.getJSON();
        // check
        var check = function ( o ) {
            if ( o.Name ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        if ( !osgDB.ObjectWrapper.serializers.osg.Object( input, st ) ) {
            return;
        }

        if ( jsonObj.Quaternion ) {
            st.setQuaternion( jsonObj.Quaternion );
        }
        return st;
    };

    osgDB.ObjectWrapper.serializers.osgAnimation.StackedRotateAxis = function ( input, st ) {
        var jsonObj = input.getJSON();
        // check
        var check = function ( o ) {
            if ( o.Axis ) {
                return true;
            }
            return false;
        };
        if ( !check( jsonObj ) ) {
            return;
        }

        if ( !osgDB.ObjectWrapper.serializers.osg.Object( input, st ) ) {
            return;
        }

        if ( jsonObj.Angle ) {
            st.setAngle( jsonObj.Angle );
        }

        st.setAxis( jsonObj.Axis );

        return st;
    };

    return {
        Object: Object,
        Node: Node,
        StateSet: StateSet,
        Material: Material,
        BlendFunc: BlendFunc,
        CullFace: CullFace,
        BlendColor: BlendColor,
        Light: Light,
        Texture: Texture,
        Projection: Projection,
        MatrixTransform: MatrixTransform,
        LightSource: LightSource,
        Geometry: Geometry
    };
} );