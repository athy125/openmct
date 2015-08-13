/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define*/

define(
    [],
    function () {
        "use strict";

        var BASE_COLORS = [
                [ 136, 32, 32 ],
                [ 224, 64, 64 ],
                [ 240, 160, 72 ],
                [ 255, 248, 96 ],
                [ 128, 240, 72 ],
                [ 128, 248, 248 ],
                [ 88, 144, 224 ],
                [ 0, 72, 240 ],
                [ 136, 80, 240 ],
                [ 224, 96, 248 ]
            ],
            GRADIENTS = [0.75, 0.50, 0.25, -0.25, -0.50, -0.75],
            GROUPS = [];

        function toWebColor(triplet) {
            return '#' + triplet.map(function (v) {
                return (v < 16 ? '0' : '') + v.toString(16);
            }).join('');
        }

        function toGradient(triplet, value) {
            return triplet.map(function (v) {
                return Math.round(value > 0 ?
                        (v + (255 - v) * value) :
                        (v * (1 + value))
                    );
            });
        }

        function initializeGroups() {
            var i, group;

            // Ten grayscale colors
            group = [];
            while (group.length < 10) {
                group.push(toWebColor([
                    Math.round(28.3333 * group.length),
                    Math.round(28.3333 * group.length),
                    Math.round(28.3333 * group.length)
                ]));
            }
            GROUPS.push(group);

            // Ten basic colors
            GROUPS.push(BASE_COLORS.map(toWebColor));

            // ...and some gradients of those colors
            group = [];
            GRADIENTS.forEach(function (v) {
                group = group.concat(BASE_COLORS.map(function (c) {
                    return toWebColor(toGradient(c, v));
                }));
            });
            GROUPS.push(group);
        }

        function ColorController() {
            if (GROUPS.length === 0) {
                initializeGroups();
            }
        }

        ColorController.prototype.groups = function () {
            return GROUPS;
        };

        return ColorController;
    }
);
