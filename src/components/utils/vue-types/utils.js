import isPlainObject from 'lodash/isPlainObject';
let ObjProto = Object.prototype;
let toString = ObjProto.toString;
export const hasOwn = ObjProto.hasOwnProperty;

let FN_MATCH_REGEXP = /^\s*function (\w+)/;

// 获取类型
export const getType = function getType (fn) {
  let type = fn !== null && fn !== undefined ? fn.type ? fn.type : fn : null;
  let match = type && type.toString().match(FN_MATCH_REGEXP);
  return match && match[1];
};

// 获取该数据类型
export const getNativeType = function getNativeType (value) {
  if (value === null || value === undefined) {
    return null;
  }
  let match = value.constructor.toString().match(FN_MATCH_REGEXP);
  return match && match[1];
};

export const noop = function noop () {};

// 判断对象是否存在这个属性
export const has = function has (obj , prop) {
  return hasOwn.call(obj , prop);
};

// 判断是否为整数
export const isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

// 判断是否为数组
export const isArray = Array.isArray || function (value) {
  return toString.call(value) === '[object Array]';
};

// 判断是否为函数
export const isFunction = function isFunction (value) {
  return toString.call(value) === '[object Function]';
};

export const withDefault = function withDefault (type) {
  Object.defineProperty(type , 'def' , {
    value : function value (def) {
      if (def === undefined && this['default'] === undefined) {
        this['default'] = undefined;
        return this;
      };
      if (isFunction(def) && !validateType(this , def)) {
        warn(this._vueTypes_name + ' - invalid default value: "' + def + '"' , def);
        return this;
      }
      this['default'] = isArray(def) || isPlainObject(def) ? function () {
        return def;
      } : def;
      return this;
    },
    enumerable : false,
    writable : false
  })
};

export const withRequired = function withRequired (type) {
  Object.defineProperty(type , 'isRequired' , {
    get : function get () {
      this.required = true;
      return this;
    },
    enumerable : false
  })
}

export const toType = function toType (name , obj) {
  Object.defineProperty(obj , '_vueTypes_name' , {
    enumerable : false,
    writable : false,
    value : name
  });
  withRequired(obj);
  withDefault(obj);
  if (isFunction(obj.validator)) {
    obj.validator = obj.validator.bind(obj);
  };
  return obj;
};

// 验证属性类型
export const validateType = function validateType (type , value) {
  let silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  let typeToCheck = type;
  let valid = true;
  let expectedType = void 0;
  if (!isPlainObject(type)) {
    typeToCheck = { type : type };
  }
  let namePrefix = typeToCheck._vueTypes_name ? typeToCheck._vueTypes_name + ' - ' : '';

  if (hasOwn.call(typeToCheck , 'type') && typeToCheck.type !== null) {
    if (isArray(typeToCheck.type)) {
      valid = typeToCheck.type.some(function (type) {
        return validateType(type , value , true);
      });
      expectedType = typeToCheck.type.map(function (type) {
        return getType(type);
      }).join(' or ');
    } else {
      expectedType = getType(typeToCheck);
      if (expectedType === 'Array') {
        valid = isArray(value);
      } else if (expectedType === 'Object') {
        valid = isPlainObject(value);
      } else if (expectedType === 'String' || expectedType === 'Number' || expectedType === 'Boolean' || expectedType === 'Function') {
        valid = getNativeType(value) === expectedType;
      } else {
        valid = value instanceof typeToCheck.type;
      }
    }
  };
  if (!valid) {
    silent === false && warn(namePrefix + 'value "' + value + '" should be of type "' + expectedType + '"');
    return false;
  }
  if (hasOwn.call(typeToCheck , 'validator') && isFunction(typeToCheck.validator)) {
    valid = typeToCheck.validator(value);
    if (!valid && silent === false) {
      warn(namePrefix + 'custom validation failed');
    }
    return valid;
  };
  return valid;
}


let warn = noop;
if (process.env.NODE_ENV !== 'production') {
  let hasConsole = typeof console !== 'undefined';
  warn = function warn (msg) {
    if (hasConsole) {
      console.warn('[VueTypes warn]: ' + msg);
    }
  }
}
export { warn };