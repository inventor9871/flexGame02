<script setup>
import { ref, computed, watch } from 'vue';
import { levels } from '../data/levels';

const currentLevelIndex = ref(0);
const userInput = ref('');
const isPassed = ref(false);

// 新增：紀錄當前點擊查閱的語法提示
const activeHintKey = ref('display');

const currentLevel = computed(() => levels[currentLevelIndex.value]);

// 講義核心語法提示資料庫
const syntaxHints = {
    'display': {
        title: 'display: flex;',
        desc: '宣告外容器為 Flex 佈局。內元件（子元素）會自動變成 Flex 項目，並預設由左往右橫向排列。'
    },
    'flex-direction': {
        title: 'flex-direction',
        desc: '控制「主軸」的方向。',
        options: ['row (預設，橫向)', 'row-reverse (橫向反轉)', 'column (垂直)', 'column-reverse (垂直反轉)']
    },
    'justify-content': {
        title: 'justify-content',
        desc: '控制項目在「主軸」上的對齊與空間分配。',
        options: ['flex-start (靠起點)', 'flex-end (靠終點)', 'center (置中)', 'space-between (首尾靠邊，其餘平分)', 'space-around (每個項目兩側平分空間)']
    },
    'align-items': {
        title: 'align-items',
        desc: '控制項目在「交錯軸（與主軸垂直）」上的對齊。',
        options: ['stretch (預設，拉伸填滿)', 'flex-start (靠頂端)', 'flex-end (靠底端)', 'center (垂直置中)']
    },
    'flex-wrap': {
        title: 'flex-wrap',
        desc: '控制當內容物超出外容器時，是否要自動換行。',
        options: ['nowrap (預設，不換行，元件會被壓縮)', 'wrap (換行)']
    }
};

// 解析學生的輸入，將純文字 CSS 轉成 Vue 的 style 物件
const parsedUserStyle = computed(() => {
    const styles = {};
    if (!userInput.value) return styles;

    const lines = userInput.value.split(';');
    lines.forEach(line => {
        const [prop, val] = line.split(':');
        if (prop && val) {
            const property = prop.trim().toLowerCase();
            const value = val.trim().toLowerCase();
            const camelCaseProp = property.replace(/-([a-z])/g, g => g[1].toUpperCase());
            styles[camelCaseProp] = value;
        }
    });
    return styles;
});

// 切換下一關的邏輯
const nextLevel = () => {
    if (currentLevelIndex.value < levels.length - 1) {
        currentLevelIndex.value++;
        userInput.value = '';
        isPassed.value = false;
    } else {
        alert('🎉 指揮官！你已成功帶領艦隊通過所有銀河矩陣！');
    }
};

// 監聽輸入：若答對，則觸發定時器自動跳下一關
let advanceTimeout = null;

watch(userInput, () => {
    const rules = currentLevel.value.requiredRules;
    let matchCount = 0;
    const totalRules = Object.keys(rules).length;

    for (const [prop, val] of Object.entries(rules)) {
        const camelProp = prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
        if (parsedUserStyle.value[camelProp] === val) {
            matchCount++;
        }
    }

    if (matchCount === totalRules) {
        isPassed.value = true;

        // 如果沒有正在等待的計時器，就設定 1 秒後自動進下一關
        if (!advanceTimeout) {
            advanceTimeout = setTimeout(() => {
                nextLevel();
                advanceTimeout = null;
            }, 1200); // 1.2 秒，剛好讓滑動動畫跑完並留有一點成就感時間
        }
    } else {
        isPassed.value = false;
        if (advanceTimeout) {
            clearTimeout(advanceTimeout);
            advanceTimeout = null;
        }
    }
});
</script>

<template>
    <div class="game-container">
        <!-- 左側：太空總署控制台 -->
        <div class="control-panel">
            <div class="header">
                <h2>{{ currentLevel.title }}</h2>
                <span class="progress">任務進度: {{ currentLevel.id }} / {{ levels.length }}</span>
            </div>

            <p class="description">{{ currentLevel.description }}</p>

            <!-- 語法查閱按鈕區 -->
            <div class="syntax-tabs">
                <span class="tabs-label">講義語法查閱：</span>
                <button v-for="(hint, key) in syntaxHints" :key="key"
                    :class="['syntax-tab-btn', { active: activeHintKey === key }]" @click="activeHintKey = key">
                    {{ key }}
                </button>
            </div>

            <!-- 動態提示顯示面板 -->
            <div class="hint-panel" v-if="activeHintKey">
                <h4>{{ syntaxHints[activeHintKey].title }}</h4>
                <p>{{ syntaxHints[activeHintKey].desc }}</p>
                <ul v-if="syntaxHints[activeHintKey].options">
                    <li v-for="opt in syntaxHints[activeHintKey].options" :key="opt">
                        <code>{{ opt }}</code>
                    </li>
                </ul>
            </div>

            <!-- 代碼輸入區 -->
            <div class="code-box">
                <div class="code-line">.space-station {</div>
                <div class="code-line indent">display: flex;</div>
                <div class="code-line indent" v-if="currentLevel.baseStyles.flexDirection">
                    flex-direction: {{ currentLevel.baseStyles.flexDirection }};
                </div>
                <div class="code-line indent" v-if="currentLevel.baseStyles.flexWrap">
                    flex-wrap: {{ currentLevel.baseStyles.flexWrap }};
                </div>

                <div class="input-area">
                    <textarea v-model="userInput" placeholder="請在這裡輸入 Flexbox 排版指令..." rows="4"
                        :disabled="isPassed"></textarea>
                </div>

                <div class="code-line">}</div>
            </div>

            <!-- 狀態提示區（移除了手動按鈕） -->
            <div class="action-zone">
                <div v-if="isPassed" class="success-banner">
                    🚀 座標正確！系統正在自動跳轉下一關...
                </div>
                <p v-else class="status-hint">📡 等待正確的星際軌道參數輸入...</p>
            </div>
        </div>

        <!-- 右側：星際太空畫布 -->
        <div class="game-canvas">
            <!-- 格線背景，更有科技感 -->
            <div class="grid-overlay"></div>

            <!-- 底層：目標定位點 -->
            <div class="layer target-layer" :style="[currentLevel.baseStyles, currentLevel.targetStyles]">
                <div v-for="n in currentLevel.count" :key="'target-' + n" class="space-item target-item">
                    {{ currentLevel.targetEmoji }}
                </div>
            </div>

            <!-- 頂層：玩家控制的太空飛行器 -->
            <div class="layer player-layer" :style="[currentLevel.baseStyles, parsedUserStyle]">
                <div v-for="n in currentLevel.count" :key="'player-' + n" class="space-item actual-item">
                    {{ currentLevel.emoji }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 修改原有的 .game-container 樣式 */
.game-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    font-family: 'Segoe UI', Roboto, sans-serif;
    background-color: #0f172a;
    color: #f8fafc;
    box-sizing: border-box;
}

/* 核心 RWD 斷點：在螢幕寬度小於 768px (平板/手機) 時觸發 */
@media (max-width: 768px) {
    .game-container {
        flex-direction: column;
        /* 改為垂直堆疊 */
        height: auto;
        overflow-y: auto;
    }

    .control-panel {
        width: 100%;
        order: 2;
        /* 代碼區移到下面 */
        padding: 20px;
        height: auto;
    }

    .game-canvas {
        width: 100%;
        height: 40vh;
        /* 畫布佔上方 40% 高度 */
        order: 1;
        /* 畫布移到上面 */
    }

    /* 手機版字體微調 */
    .code-box {
        font-size: 13px;
    }

    .space-item {
        width: 50px;
        height: 50px;
        font-size: 30px;
        margin: 6px;
    }
}

/* 針對超小手機的進一步縮排 */
@media (max-width: 480px) {
    .header h2 {
        font-size: 18px;
    }

    .hint-panel {
        font-size: 12px;
    }
}

/* 左側控制台 */
.control-panel {
    width: 45%;
    padding: 30px;
    background-color: #1e293b;
    display: flex;
    flex-direction: column;
    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.5);
    z-index: 10;
    overflow-y: auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #334155;
    padding-bottom: 12px;
}

.progress {
    background-color: #38bdf8;
    color: #0f172a;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
}

.description {
    margin: 16px 0;
    line-height: 1.6;
    color: #94a3b8;
}

/* 語法切換按鈕 */
.syntax-tabs {
    margin-bottom: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
}

.tabs-label {
    font-size: 13px;
    color: #64748b;
    width: 100%;
    margin-bottom: 4px;
}

.syntax-tab-btn {
    background-color: #334155;
    border: 1px solid #475569;
    color: #cbd5e1;
    padding: 4px 10px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
}

.syntax-tab-btn:hover {
    background-color: #475569;
    color: #fff;
}

.syntax-tab-btn.active {
    background-color: #0284c7;
    border-color: #38bdf8;
    color: white;
}

/* 提示面板 */
.hint-panel {
    background-color: #0f172a;
    border-left: 4px solid #38bdf8;
    padding: 12px 16px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 20px;
    font-size: 14px;
}

.hint-panel h4 {
    margin: 0 0 6px 0;
    font-family: monospace;
    color: #38bdf8;
}

.hint-panel p {
    margin: 0 0 8px 0;
    color: #94a3b8;
    line-height: 1.4;
}

.hint-panel ul {
    margin: 0;
    padding-left: 20px;
    color: #cbd5e1;
}

.hint-panel code {
    color: #e2e8f0;
    background-color: #1e293b;
    padding: 2px 4px;
    border-radius: 4px;
}

/* 代碼輸入 */
.code-box {
    background-color: #090d16;
    padding: 20px;
    border-radius: 8px;
    font-family: 'Fira Code', 'Courier New', Courier, monospace;
    font-size: 15px;
    color: #38bdf8;
    border: 1px solid #1e293b;
}

.indent {
    margin-left: 24px;
}

.input-area {
    margin: 12px 0 12px 24px;
}

textarea {
    width: 90%;
    background-color: #1e293b;
    border: 1px solid #334155;
    color: #f1f5f9;
    font-family: inherit;
    font-size: 16px;
    padding: 12px;
    border-radius: 6px;
    resize: none;
    line-height: 1.5;
}

textarea:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

textarea:disabled {
    background-color: #0f172a;
    color: #475569;
    border-color: #1e293b;
}

.action-zone {
    margin-top: auto;
    padding-top: 20px;
    min-height: 60px;
}

.success-banner {
    width: 100%;
    padding: 16px;
    background-color: #16a34a;
    color: white;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
    animation: pulse 1.5s infinite;
}

.status-hint {
    text-align: center;
    color: #475569;
    font-style: italic;
}

/* 右側太空畫布 */
.game-canvas {
    width: 55%;
    position: relative;
    background-color: #020617;
    overflow: hidden;
}

/* 科幻感背景格線 */
.grid-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
}

.layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    z-index: 2;
}

.target-layer,
.player-layer {
    align-content: flex-start;
}

/* 太空物件基礎樣式 */
.space-item {
    width: 75px;
    height: 75px;
    font-size: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 12px;
    border-radius: 16px;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    /* 平滑的推進動畫 */
}

/* 目標點樣式 */
.target-item {
    background-color: rgba(56, 189, 248, 0.1);
    border: 2px dashed rgba(56, 189, 248, 0.4);
    box-shadow: inset 0 0 15px rgba(56, 189, 248, 0.1);
}

/* 玩家載具樣式 */
.actual-item {
    background: radial-gradient(circle, #334155 0%, #1e293b 100%);
    border: 2px solid #38bdf8;
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
}

@keyframes pulse {
    0% {
        opacity: 0.9;
    }

    50% {
        opacity: 1;
        box-shadow: 0 4px 25px rgba(22, 163, 74, 0.5);
    }

    100% {
        opacity: 0.9;
    }
}
</style>