var REAL_WORLD_GIF_BASE = 'static/gifs/realworld/';
var REAL_WORLD_MEDIA_VERSION = '2';

// Filename pattern: {bias}_{target}_* — button matches target (second object); caption is (Bias → Target).
var REAL_WORLD_TASKS = {
    counterfactual: {
        salt: {
            label: 'Salt Shaker',
            title: 'Pick the salt shaker and place it in the basket (Hand Cream → Salt Shaker)',
            baseline: 'handcream_salt_baseline.gif',
            sam: 'handcream_salt_sam.gif'
        },
        seasoning: {
            label: 'Seasoning',
            title: 'Pick the Italian seasoning and place it in the basket (Tylenol → Seasoning)',
            baseline: 'tylenol_seasoning_baseline.gif',
            sam: 'tylenol_seasoning_sam.gif'
        },
        sunscreen: {
            label: 'Sunscreen',
            title: 'Pick the sunscreen and place it in the basket (Seasoning → Sunscreen)',
            baseline: 'seasoning_sunscreen_baseline.gif',
            sam: 'seasoning_sunscreen_sam.gif'
        },
        tylenol: {
            label: 'Tylenol',
            title: 'Pick the tylenol and place it in the basket (Sunscreen → Tylenol)',
            baseline: 'pick_baseline.gif',
            sam: 'pick_sam.gif'
        },
        hand_cream: {
            label: 'Hand Cream',
            title: 'Pick the hand cream and place it in the basket (Salt Shaker → Hand Cream)',
            baseline: 'salt_handcream_baseline.gif',
            sam: 'salt_handcream_sam.gif'
        }
    },
    towel: {
        seasoning: {
            label: 'Seasoning',
            title: 'Pick the Italian seasoning and place it in the basket (Tylenol → Seasoning)',
            baseline: 'towel_tylenol_seasoning_baseline.gif',
            sam: 'towel_tylenol_seasoning_sam.gif'
        },
        sunscreen: {
            label: 'Sunscreen',
            title: 'Pick the sunscreen and place it in the basket (Salt Shaker → Sunscreen)',
            baseline: 'towel_baseline.gif',
            sam: 'towel_sam.gif'
        },
        salt: {
            label: 'Salt Shaker',
            title: 'Pick the salt shaker and place it in the basket (Sunscreen → Salt Shaker)',
            baseline: 'towel_sunscreen_salt_baseline.gif',
            sam: 'towel_sunscreen_salt_sam.gif'
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
    var baselineMedia = root.querySelector('[data-role="baseline"]');
    var samMedia = root.querySelector('[data-role="sam"]');
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
        setRolloutMedia(baselineMedia, REAL_WORLD_GIF_BASE + task.baseline, 'π₀.₅ on ' + task.label.toLowerCase() + ' task');
    } else {
        clearRolloutMedia(baselineMedia);
    }

    if (hasSam) {
        setRolloutMedia(samMedia, REAL_WORLD_GIF_BASE + task.sam, 'π₀.₅ + SAM on ' + task.label.toLowerCase() + ' task');
    } else {
        clearRolloutMedia(samMedia);
    }
}

function setRolloutMedia(element, src, alt) {
    if (!element) return;

    var versionedSrc = src + '?v=' + REAL_WORLD_MEDIA_VERSION;

    if (src.endsWith('.mp4')) {
        if (element.tagName !== 'VIDEO') {
            var video = document.createElement('video');
            video.setAttribute('data-role', element.getAttribute('data-role'));
            video.loading = 'lazy';
            video.muted = true;
            video.loop = true;
            video.autoplay = true;
            video.playsInline = true;
            video.controls = true;
            element.replaceWith(video);
            element = video;
        }
        element.src = versionedSrc;
        element.removeAttribute('alt');
    } else {
        if (element.tagName !== 'IMG') {
            var img = document.createElement('img');
            img.setAttribute('data-role', element.getAttribute('data-role'));
            img.loading = 'lazy';
            element.replaceWith(img);
            element = img;
        }
        element.src = versionedSrc;
        element.alt = alt;
    }
}

function clearRolloutMedia(element) {
    if (!element) return;
    element.removeAttribute('src');
    if (element.tagName === 'IMG') {
        element.removeAttribute('alt');
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
