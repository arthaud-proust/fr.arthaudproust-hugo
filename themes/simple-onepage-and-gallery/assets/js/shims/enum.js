function Enum() {
    const d = {};
    for(let member of arguments) {
        d[member] = `${member}.${(Date.now()*Math.random()).toString().replace(/\./gm, '')}`
    }
    d._getMember = function(enumEl) {
        return this[enumEl].split('.')[0];
    }
    d._getMembers = function() {
        return Object.keys(this).filter(key=>!key.startsWith('_'));
    }

    return d;
}

module.exports = { Enum };