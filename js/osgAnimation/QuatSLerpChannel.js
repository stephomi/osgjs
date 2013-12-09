/*global define */

define( [
    'osg/osg',
    'osgAnimation/Channel',
    'osgAnimation/QuatLerpChannel',
    'osgAnimation/QuatSlerpInterpolator'
], function ( osg, Channel, QuatLerpChannel, QuatSlerpInterpolator ) {

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

    var QuatSlerpChannel = function ( keys, target ) {
        QuatLerpChannel.call( this, keys, target );
        this.getSampler().setInterpolator( QuatSlerpInterpolator );
    };

    QuatSlerpChannel.prototype = Channel.prototype;

    return QuatSLerpChannel;
} );