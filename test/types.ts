/* eslint-disable @typescript-eslint/no-unused-vars */

import Rootpath from '../rootpath.js'

import { $Rootpath } from '../rootpath.js'

var root = Rootpath()

var root = Rootpath('a')
var root = Rootpath([ 'a' ])

var root = Rootpath('a', 'b')
var root = Rootpath([ 'a', 'b' ])
var root = Rootpath([ 'a', 'b' ], 'c')

// $ExpectError
var root = Rootpath(1)

// $ExpectError
var root = Rootpath(null)

// $ExpectError
var root = Rootpath(void 0)

// $ExpectError
var root = Rootpath([ null, false, 1 ])

var root2 = Rootpath()
var root3 = Rootpath(root2)

var good = Rootpath()

good('a')
good([ 'a' ], 'b')
good([ 'a', 'b' ])

// $ExpectError
good(1)

// $ExpectError
good(null)

// $ExpectError
good(void 0)

// $ExpectError
good([ null, false, 1 ])

// $ExpectError
good.over('a', 'b', 'c')

// $ExpectError
good.over([[ null, false, 1 ]])

var copy: $Rootpath = root
