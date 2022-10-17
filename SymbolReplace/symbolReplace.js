let replaceSymbls = document.querySelector('.textWrap');
    document.querySelector('.replacement').addEventListener('click', () => {
        //замена одинарных ковычек на двойные, кроме апострофов:
        replaceSymbls.textContent = replaceSymbls.textContent.replace(/\B'|'\B/gm, '"');
        //замена всех одинарных ковычек с апострофами:
        //block.textContent = block.textContent.replace(/'/g, '"');

    });