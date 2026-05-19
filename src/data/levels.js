export const levels = [
  {
    id: 1,
    title: "1. 火箭推進定位",
    description: "歡迎來到太空總署。請利用 `justify-content` 讓火箭向右看齊，精準停泊到右側的發射台。",
    count: 2,
    emoji: "🚀",
    targetEmoji: "🎯",
    baseStyles: { display: 'flex', flexDirection: 'row' },
    targetStyles: { justifyContent: 'flex-end' },
    requiredRules: { 'justify-content': 'flex-end' }
  },
  {
    id: 2,
    title: "2. 能量核心對齊",
    description: "使用 `justify-content` 讓太空艙移動到軌道正中央的能量放射區。",
    count: 2,
    emoji: "🛸",
    targetEmoji: "🌀",
    baseStyles: { display: 'flex', flexDirection: 'row' },
    targetStyles: { justifyContent: 'center' },
    requiredRules: { 'justify-content': 'center' }
  },
  {
    id: 3,
    title: "3. 艦隊安全巡航距離",
    description: "星際艦隊必須保持安全距離。使用 `justify-content` 讓三艘火箭「平均分配」彼此左右兩側的星際空間。",
    count: 3,
    emoji: "🚀",
    targetEmoji: "✨",
    baseStyles: { display: 'flex', flexDirection: 'row' },
    targetStyles: { justifyContent: 'space-around' },
    requiredRules: { 'justify-content': 'space-around' }
  },
  {
    id: 4,
    title: "4. 星際防護網部署",
    description: "首尾兩顆衛星必須靠著邊界，其餘平均分配空間以建立最大防護網。請使用 `justify-content` 的拉開屬性。",
    count: 3,
    emoji: "🛰️",
    targetEmoji: "🌐",
    baseStyles: { display: 'flex', flexDirection: 'row' },
    targetStyles: { justifyContent: 'space-between' },
    requiredRules: { 'justify-content': 'space-between' }
  },
  {
    id: 5,
    title: "5. 降落地下基底",
    description: "水平定位完成，接著調整垂直交錯軸。請用 `align-items` 讓探測車降落到最底部的月球表面。",
    count: 2,
    emoji: "🚜",
    targetEmoji: "🕳️",
    baseStyles: { display: 'flex', flexDirection: 'row' },
    targetStyles: { alignItems: 'flex-end' },
    requiredRules: { 'align-items': 'flex-end' }
  },
  {
    id: 6,
    title: "6. 太空站完美對接",
    description: "綜合練習：請同時控制主軸與交錯軸，讓補給艙精準進入空間站的正核心。",
    count: 1,
    emoji: "🚀",
    targetEmoji: "🛰️",
    baseStyles: { display: 'flex', flexDirection: 'row' },
    targetStyles: { justifyContent: 'center', alignItems: 'center' },
    requiredRules: { 'justify-content': 'center', 'align-items': 'center' }
  },
  {
    id: 7,
    title: "7. 艦隊逆向回航",
    description: "使用 `flex-direction` 改變主軸方向，讓飛碟從右邊往左邊排隊，並且出發順序反轉。",
    count: 3,
    emoji: "🛸",
    targetEmoji: "✨",
    baseStyles: { display: 'flex' },
    targetStyles: { flexDirection: 'row-reverse' },
    requiredRules: { 'flex-direction': 'row-reverse' }
  },
  {
    id: 8,
    title: "8. 垂直發射塔疊放",
    description: "改變主軸方向！使用 `flex-direction` 讓探測衛星由上至下垂直排入發射中軸。",
    count: 3,
    emoji: "🛰️",
    targetEmoji: "🪜",
    baseStyles: { display: 'flex' },
    targetStyles: { flexDirection: 'column' },
    requiredRules: { 'flex-direction': 'column' }
  },
  {
    id: 9,
    title: "9. 垂直推進器置底",
    description: "當主軸變成垂直（`column`）時，`justify-content` 控制的是垂直方向。請讓火箭沉到發射塔最底部。",
    count: 2,
    emoji: "🚀",
    targetEmoji: "🔥",
    baseStyles: { display: 'flex', flexDirection: 'column' },
    targetStyles: { justifyContent: 'flex-end' },
    requiredRules: { 'flex-direction': 'column', 'justify-content': 'flex-end' }
  },
  {
    id: 10,
    title: "10. 逆向重力防禦線",
    description: "結合 `flex-direction: column-reverse` 與交錯軸對齊，讓飛碟移到右下角，且垂直倒序排好。",
    count: 3,
    emoji: "🛸",
    targetEmoji: "⚡",
    baseStyles: { display: 'flex' },
    targetStyles: { flexDirection: 'column-reverse', alignItems: 'flex-end' },
    requiredRules: { 'flex-direction': 'column-reverse', 'align-items': 'flex-end' }
  },
  {
    id: 11,
    title: "11. 微型衛星群繞行",
    description: "這裡有一大批微型衛星，單一軌道塞不下了！請開啟 `flex-wrap` 讓多出來的衛星自動繞行到下一層軌道。",
    count: 8,
    emoji: "🛰️",
    targetEmoji: "⭕",
    baseStyles: { display: 'flex', flexDirection: 'row' },
    targetStyles: { flexWrap: 'wrap' },
    requiredRules: { 'flex-wrap': 'wrap' }
  },
  {
    id: 12,
    title: "12. 銀河矩陣最終試煉",
    description: "指揮官，最後考驗！請同時使用「垂直排列」、「換行」與「主軸置中」，將整批火箭組裝成完美的星際矩陣。",
    count: 8,
    emoji: "🚀",
    targetEmoji: "🌌",
    baseStyles: { display: 'flex' },
    targetStyles: { flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' },
    requiredRules: { 'flex-direction': 'column', 'flex-wrap': 'wrap', 'justify-content': 'center' }
  }
];