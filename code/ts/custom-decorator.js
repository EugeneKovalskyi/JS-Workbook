"use strict";
//* tsc custom-decorator.ts --t es2020 -m esnext --strict true --experimentalDecorators true --emitDecoratorMetadata true && node custom-decorator.js
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const CALLED = '\x1b[1;34mCALLED\x1b[0m';
const SUCCESS = '\x1b[1;32mSUCCESS\x1b[0m';
const ERROR = '\x1b[1;31mERROR\x1b[0m';
const PROPERTY = '\x1b[2;32mPROPERTY\x1b[0m';
const CACHE = '\x1b[1;38;5;215mCACHE\x1b[0m';
const METADATA = {};
//* Class Decorator
function Log() {
    return function (target) {
        const fields = Object.getOwnPropertyNames(target.prototype)
            .filter(property => property !== 'constructor');
        return class extends target {
            constructor(...superArgs) {
                super(...superArgs);
                for (const field of fields) {
                    const styledFieldStr = '\x1b[38;2;30;190;10m' + field + '\x1b[0m';
                    if (this[field] instanceof Function) {
                        const method = this[field].bind(this); // this[field]
                        this[field] = (...args) => {
                            try {
                                console.info(`\n${CALLED}: ${styledFieldStr} with arguments: \x1b[33m${JSON.stringify(args, null, 2)}\x1b[0m`);
                                const result = method(...args);
                                console.info(`${SUCCESS}: ${styledFieldStr} return: \x1b[33m${JSON.stringify(result, null, 2)}\x1b[0m`);
                                return result;
                            }
                            catch (error) {
                                console.error(`${ERROR}: ${styledFieldStr} throw ${error}`);
                            }
                        };
                    }
                    else {
                        console.info(`${PROPERTY}: ${styledFieldStr} === \x1b[33m${JSON.stringify(this[field], null, 2)}\x1b[0m`);
                    }
                }
            }
        };
    };
}
//* Property Decorator
function IsString() {
    return function (target, propertyKey) {
        let value;
        const getter = () => value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string')
                throw new Error('\x1b[31m"name" must be <string>.\x1b[0m');
            value = newValue;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    };
}
//* Method Decorator
function CacheResult() {
    return function (target, methodKey, descriptor) {
        const originalMethod = descriptor.value;
        if (!target.cache)
            target.cache = new Map();
        descriptor.value = function (...args) {
            const cacheKey = methodKey + JSON.stringify(args);
            let cacheValue;
            if (target.cache.has(cacheKey)) {
                console.warn(`${CACHE}: Returned from cache!`);
                return target.cache.get(cacheKey);
            }
            cacheValue = originalMethod(...args);
            target.cache.set(cacheKey, cacheValue);
            console.warn(`${CACHE}: New value cached!`);
            return cacheValue;
        };
        return descriptor;
    };
}
//* Parameter Decorator
function Max(value) {
    return function (target, methodKey, paramIndex) {
        const paramKey = target[methodKey].toString()
            .match(/\(([^)]*?)\)/)?.[1]?.split(',')[paramIndex].trim();
        const maxDecoKey = target.name + methodKey + 'Max';
        const paramMetadata = METADATA[maxDecoKey] ?? (METADATA[maxDecoKey] = []);
        paramMetadata.push({
            key: paramKey,
            index: paramIndex,
            maxValue: value
        });
    };
}
// Method decorator uses metadata that param decorator initialized before 
function Validate() {
    return function (target, methodKey, descriptor) {
        const originalMethod = target[methodKey];
        const maxDecoKey = target.name + methodKey + 'Max';
        descriptor.value = function (...args) {
            for (const param of METADATA[maxDecoKey])
                if (args[param.index] > param.maxValue)
                    throw new Error(`\x1b[31mParameter "${param.key}" of method "${methodKey}" must be <= ${param.maxValue}.\x1b[0m`);
            return originalMethod(...args);
        };
        return descriptor;
    };
}
//* Testing decorators
let User = class User {
    constructor(name) {
        this.name = name;
    }
    speak(sound, listener) {
        // throw new Error('Custom error from class method') //* Error
        return listener + ' heard ' + sound;
    }
    calcSalary(rate, efficiency) {
        return rate * efficiency;
    }
};
__decorate([
    IsString(),
    __metadata("design:type", Object)
], User.prototype, "name", void 0);
__decorate([
    CacheResult(),
    Validate(),
    __param(0, Max(9999)),
    __param(1, Max(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], User.prototype, "calcSalary", null);
User = __decorate([
    Log(),
    __metadata("design:paramtypes", [Object])
], User);
const users = [
    new User('Alex'),
    new User('Bod'),
    // new User(123) //* Error
];
for (const user of users) {
    const efficiency = Number(Math.random().toFixed(3));
    user.speak('miaow-miaow', 'everyone');
    user.calcSalary(500, efficiency);
    user.calcSalary(1000, efficiency);
    // user.calcSalary(10000, 10) //* Error
}
//* Decoration sequence
showDecorationSequence();
function showDecorationSequence() {
    console.log('\n\x1b[1;37mDecoration sequence:\x1b[0m');
    let Class = class Class {
        method(param) { }
    };
    __decorate([
        PropDeco(),
        __metadata("design:type", Object)
    ], Class.prototype, "prop", void 0);
    __decorate([
        MethodDeco(),
        __param(0, ParamDeco()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Class.prototype, "method", null);
    Class = __decorate([
        ClassDeco()
    ], Class);
    function ClassDeco() {
        console.log('\t7. Class factory');
        return function (...args) {
            console.log('\t8. Class deco');
        };
    }
    function PropDeco() {
        console.log('\t1. Prop factory');
        return function (...args) {
            console.log('\t2. Prop deco');
        };
    }
    function MethodDeco() {
        console.log('\t3. Method factory');
        return function (...args) {
            console.log('\t6. Method deco');
        };
    }
    function ParamDeco() {
        console.log('\t4. Param factory');
        return function (...args) {
            console.log('\t5. Param deco');
        };
    }
    console.log('\n');
}
