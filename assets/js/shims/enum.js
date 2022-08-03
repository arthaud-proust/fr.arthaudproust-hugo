function EnumMember(value) {
    const member = new String(value);
    member.toText = function() {
        return this.split('.')[0];
    }
    return member;
}

function Enum() {
    const d = {};
    for(let member of arguments) {
        d[member.toUpperCase()] = EnumMember(`${member.toUpperCase()}.${(Date.now()*Math.random()).toString().replace(/\./gm, '')}`)
    }
    d._getMember = function(memberName) {
        return this[memberName.toUpperCase()].split('.')[0];
    }
    d._getMembers = function() {
        return Object.keys(this).filter(key=>!key.startsWith('_'));
    }

    return d;
}

module.exports = { Enum };