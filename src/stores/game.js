import { defineStore } from 'pinia'
import { levels } from '@/data/levels'

export const useGameStore = defineStore('game', {
  state: () => ({
    levels: levels,
    currentLevelIndex: 0, // 從第 0 關（第一關）開始
    completedLevels: [],  // 紀錄哪些關卡已經挑戰成功
  }),
  getters: {
    currentLevel: (state) => state.levels[state.currentLevelIndex],
    totalLevels: (state) => state.levels.length
  },
  actions: {
    nextLevel() {
      if (this.currentLevelIndex < this.totalLevels - 1) {
        this.currentLevelIndex++
      }
    },
    prevLevel() {
      if (this.currentLevelIndex > 0) {
        this.currentLevelIndex--
      }
    },
    completeCurrentLevel() {
      if (!this.completedLevels.includes(this.currentLevelIndex)) {
        this.completedLevels.push(this.currentLevelIndex)
      }
    }
  }
})
