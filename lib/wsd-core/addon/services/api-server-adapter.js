/*
Copyright (C) 2017 Draios inc.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License version 2 as
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* global window */

import Ember from 'ember';

export default Ember.Service.extend({
    configTarget: Ember.computed(function() {
        if (window && window.process && window.process.type) {
            return 'ELECTRON';
        } else if (Ember.getOwner(this).factoryFor('config:environment').class.targetEnv === 'secure') {
            return 'SECURE';
        } else {
            return 'WEB';
        }
    }).readOnly(),

    baseURL: Ember.computed(function() {
        switch (this.get('configTarget')) {
            case 'ELECTRON':
                return 'http://localhost:3000';
            case 'WEB':
                return '';
            default:
                return '/api/sysdig';
        }
    }).readOnly(),

    buildURL(url) {
        if (url === '/capture/views') {
            switch (this.get('configTarget')) {
                case 'ELECTRON':
                case 'WEB':
                    return `${this.get('baseURL')}${url}`;
                default:
                    return `${this.get('baseURL')}/views`;
            }
        } else {
            return `${this.get('baseURL')}${url}`;
        }
    },
});