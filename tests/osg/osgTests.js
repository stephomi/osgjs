define( [
    'tests/osg/BlendColor',
    'tests/osg/BoundingBox',
    'tests/osg/BoundingSphere',
    'tests/osg/BufferArray',
    'tests/osg/Camera',
    'tests/osg/ComputeMatrixFromNodePath',
    'tests/osg/CullFace',
    'tests/osg/CullVisitor',
    'tests/osg/Depth',
    'tests/osg/Light',
    'tests/osg/Matrix',
    'tests/osg/MatrixTransform',
    'tests/osg/Node',
    'tests/osg/NodeVisitor',
    'tests/osg/Quat',
    'tests/osg/ShaderGenerator',
    'tests/osg/State',
    'tests/osg/StateSet',
    'tests/osg/Texture',
    'tests/osg/TextureCubeMap',
    'tests/osg/UpdateVisitor',
    'tests/osg/Vec2'
], function ( BlendColor, BoundingBox, BoundingSphere, BufferArray, Camera, ComputeMatrixFromNodePath, CullFace, CullVisitor, Depth, Light, Matrix, MatrixTransform, Node, NodeVisitor, Quat, ShaderGenerator, State, StateSet, Texture, TextureCubeMap, UpdateVisitor, Vec2 ) {

    return function () {
        BlendColor();
        BoundingBox();
        BoundingSphere();
        BufferArray();
        Camera();
        ComputeMatrixFromNodePath();
        CullVisitor();
        CullFace();
        Depth();
        Light();
        Matrix();
        MatrixTransform();
        Node();
        NodeVisitor();
        Quat();
        ShaderGenerator();
        State();
        StateSet();
        Texture();
        TextureCubeMap();
        UpdateVisitor();
        Vec2();
    };
} );