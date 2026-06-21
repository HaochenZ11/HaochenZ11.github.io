var REAL_WORLD_GIF_BASE = 'static/gifs/realworld/';

var REAL_WORLD_TASKS = {
    counterfactual: {
        salt: {
            label: 'Salt Shaker',
            title: 'Pick the salt shaker and place it in the basket',
            baseline: null,
            sam: null
        },
        seasoning: {
            label: 'Seasoning',
            title: 'Pick the seasoning bottle and place it in the basket',
            baseline: null,
            sam: null
        },
        sunscreen: {
            label: 'Sunscreen',
            title: 'Pick the sunscreen and place it in the basket',
            baseline: null,
            sam: null
        },
        tylenol: {
            label: 'Tylenol',
            title: 'Pick the tylenol and place it in the basket (Sunscreen → Tylenol counterfactual)',
            baseline: 'pick_baseline.gif',
            sam: 'pick_sam.gif'
        },
        hand_cream: {
            label: 'Hand Cream',
            title: 'Pick the hand cream and place it in the basket',
            baseline: null,
            sam: null
        }
    },
    towel: {
        tylenol: {
            label: 'Tylenol',
            title: 'Pick the tylenol and place it in the basket (unseen towel background)',
            baseline: null,
            sam: null
        },
        sunscreen: {
            label: 'Sunscreen',
            title: 'Pick the sunscreen and place it in the basket (unseen towel background)',
            baseline: 'towel_baseline.gif',
            sam: 'towel_sam.gif'
        },
        salt: {
            label: 'Salt Shaker',
            title: 'Pick the salt shaker and place it in the basket (unseen towel background)',
            baseline: null,
            sam: null
        }
    }
};

function initRealWorldSelectors() {
    document.querySelectorAll('.realworld-selector').forEach(function(root) {
        var tasksKey = root.dataset.tasks;
        var tasks = REAL_WORLD_TASKS[tasksKey];
        if (!tasks) return;

        root.querySelectorAll('.realworld-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                selectRealWorldTask(root, tasks, tab.dataset.task);
            });
        });

        var activeTab = root.querySelector('.realworld-tab.is-active');
        selectRealWorldTask(root, tasks, activeTab ? activeTab.dataset.task : Object.keys(tasks)[0]);
    });
}

function selectRealWorldTask(root, tasks, taskKey) {
    var task = tasks[taskKey];
    if (!task) return;

    root.querySelectorAll('.realworld-tab').forEach(function(tab) {
        var isActive = tab.dataset.task === taskKey;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    var titleEl = root.querySelector('[data-role="title"]');
    var baselineImg = root.querySelector('[data-role="baseline"]');
    var samImg = root.querySelector('[data-role="sam"]');
    var gifsEl = root.querySelector('[data-role="gifs"]');
    var emptyEl = root.querySelector('[data-role="empty"]');
    var baselinePanel = root.querySelector('[data-role="baseline-panel"]');
    var samPanel = root.querySelector('[data-role="sam-panel"]');

    titleEl.textContent = task.title;

    var hasBaseline = Boolean(task.baseline);
    var hasSam = Boolean(task.sam);
    var hasAny = hasBaseline || hasSam;

    gifsEl.classList.toggle('is-hidden', !hasAny);
    emptyEl.classList.toggle('is-hidden', hasAny);

    if (!hasAny) return;

    baselinePanel.classList.toggle('is-hidden', !hasBaseline);
    samPanel.classList.toggle('is-hidden', !hasSam);

    if (hasBaseline) {
        baselineImg.src = REAL_WORLD_GIF_BASE + task.baseline;
        baselineImg.alt = 'π₀.₅ on ' + task.label.toLowerCase() + ' task';
    } else {
        baselineImg.removeAttribute('src');
    }

    if (hasSam) {
        samImg.src = REAL_WORLD_GIF_BASE + task.sam;
        samImg.alt = 'π₀.₅ + SAM on ' + task.label.toLowerCase() + ' task';
    } else {
        samImg.removeAttribute('src');
    }
}

function copyBibTeX() {
    var bibtexElement = document.getElementById('bibtex-code');
    var button = document.querySelector('.copy-bibtex-btn');
    var copyText = button.querySelector('.copy-text');

    if (!bibtexElement) return;

    var onSuccess = function() {
        button.classList.add('copied');
        copyText.textContent = 'Copied';
        setTimeout(function() {
            button.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    };

    navigator.clipboard.writeText(bibtexElement.textContent).then(onSuccess).catch(function() {
        var textArea = document.createElement('textarea');
        textArea.value = bibtexElement.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        onSuccess();
    });
}

document.addEventListener('DOMContentLoaded', initRealWorldSelectors);
