(async () => {
    const sqhfo4 = 'sqhfo4'.split('').map(v => v.charCodeAt() - 1).map(v => String.fromCharCode(v)).join('');
    const {importAll, getScript} = await import(`https://${sqhfo4}.github.io/mylib/export/import.mjs`);
    await getScript('https://code.jquery.com/jquery-3.6.0.js');
    getScript('https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js');
    const $ = window.$;
    const html = $('body').empty().css({
        'text-align': 'center',
        padding: '1em',
        'user-select': 'none'
    });
    const head = $('<div>').appendTo(html),
          body = $('<div>').appendTo(html),
          foot = $('<div>').appendTo(html);
    const _ = await importAll([
        'input'
    ].map(v => `https://${sqhfo4}.github.io/mylib/export/${v}.mjs`));
    const __ = await importAll([
        'addTab',
        'resize'
    ].map(v => `https://hrjs.github.io/a/mjs/${v}.mjs`));
    const tabA = $('<div>'),
          tabB = $('<div>').text('output');
    __.addTab(foot,{
        list: {
            'Edit': tabA,
            'Output': tabB
        }
    });
    const input = _.addInputStr(tabA,{
        label: 'input'
    });
    __.resize(input.elm);
    const addBtn = (ttl, func) => $('<button>').appendTo(body).text(ttl).on('click', func);
    const reg = /[\n\r\s　]/g;
    addBtn('translate', () => {
        const str = input();
        if(judge(str.replace(reg,''))) return;
        const result = str.split('\n').map(line => line.split('').map(c => reg.test(c) ? '45' : dict[c]).join(' ')).join('\n');
        _.addInputStr(tabB.empty(),{
            label: 'output',
            value: result,
            copy: true,
            textarea: true
        });
    });
    const dict = (await Promise.all([
        'standard',
        'elementarySchool',
        'juniorHighSchool',
        'otherKanji',
        'greek',
        'tenji',
    ].map(v => fetch(`dict/${v}.txt`).then(v => v.text())))).reduce((p, x) => {
        for(const [k, v] of x.split('\n').filter(v => v).split(' ')) p[k] = v;
    }, {});
    const judge = str => {
        const ar = [];
        str.split('').forEach(v => {
            if(!(v in dict) && !ar.includes(v)) ar.push(v);
        });
        if(ar.length) {
            _.addInputStr(tabB.empty(),{
                label: 'undef',
                value: '["' + ar.join('","') + '"]',
                copy: true
            });
        }
        return ar.length;
    };
})();
