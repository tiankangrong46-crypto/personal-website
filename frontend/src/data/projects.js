const asset = (category, project, filename) => encodeURI(`/projects/${category}/${project}/${filename}`)

export const categories = {
  cs: {
    name: 'CS',
    kicker: 'Computer science / systems',
    description: '从本地 AI 到实时应用开发，关注工具、算法与可用系统的结合。',
    projects: [
      { name: 'CacheRag', description: '基于 Qwen 35B A3B 模型搭建带即时缓存的 RAG 知识库系统，通过缓存命中降低 Token 消耗。', stack: ['Python', 'SQLite', 'LM Studio', 'LangChain'], folder: 'CacheRag', files: ['Screenshot 2026-08-11 160151.png', 'Screenshot 2026-08-11 160223.png', 'Screenshot 2026-08-11 160241.png'] },
      { name: 'LocalAI', description: '在本地部署 Qwen 多模态模型，用于实验、开发与能力探索。', stack: ['Ollama', 'LM Studio', 'Docker'], folder: 'LocalAI', files: ['Screenshot 2026-08-11 161028.png', 'Screenshot 2026-08-11 161103.png'] },
      { name: 'Unity 2D 游戏', description: '包含难度选择、不同界面、碰撞区域、手绘动画和无限地图的 2D 动作游戏。', stack: ['C#', 'Unity 2D', '2D Physics', 'Animator', 'Tilemap', 'Pixel Art'], folder: 'unity游戏', files: ['Screenshot 2026-08-11 155006.png', 'Screenshot 2026-08-11 155107.png', 'Screenshot 2026-08-11 155132.png'] },
      { name: '装机与系统配置', description: '完成桌面计算机硬件装配、BIOS 初始化、系统与驱动配置。', stack: ['BIOS', 'System Setup', 'Driver Installation'], folder: '装机', files: ['微信图片_20260811155307_98_20.jpg'] },
    ],
  },
  design: {
    name: '设计',
    kicker: 'Design / fabrication',
    description: '从建模、打印到装配测试，让结构设计回应真实的尺寸和使用需求。',
    projects: [
      { name: '4 寸全打印穿越机', description: '全 3D 打印的 4 英寸穿越机机架，整机带电池与桨叶重约 270g；PLA+ 机臂保证硬度，PETG 顶底板兼顾韧性。', stack: ['Betaflight', 'Fusion 360', 'Bluejay', 'Creality Print', '焊接'], folder: '4寸打印穿越机', files: ['微信图片_20260811142955_92_20.jpg', '微信图片_20260811142956_93_20.jpg', '微信图片_20260811142956_94_20.jpg', '微信图片_20260811142957_95_20.jpg'] },
      { name: 'Airsoft 空载波箱', description: '连接飞控并通过舵机模块控制的空载波箱结构，需要外接有刷电调。', stack: ['Fusion 360', 'Creality Print'], folder: 'airsoft_空载波箱', files: ['微信图片_20260811141456_75_20.jpg'] },
      { name: 'Cyberpunk 螳螂刀', description: '为万圣节制作的可穿戴道具，使用 ESP32-S3 作为开发板。', stack: ['Fusion 360', 'Creality Print', 'C++', 'ESP32-S3'], folder: 'Cyberpunk螳螂刀', files: ['微信图片_20260811141456_74_20.jpg'] },
      { name: '数位屏 / 平板支架', description: 'PETG 打印的可调支架，支持厚度不超过 15mm 的数位屏、iPad 或数位板，以及厚度不超过 26mm 的桌面。', stack: ['Fusion 360', 'Creality Print', 'PETG'], folder: '数位屏_平板支架', files: ['微信图片_20260811142419_81_20.jpg'] },
      { name: '无人机定时抛投', description: '支持通过飞控舵机功能控制，也可使用 ESP 开发板实现定时或按键开合。', stack: ['Fusion 360', 'Creality Print', 'C++', 'ESP32'], folder: '无人机定时抛投', files: ['微信图片_20260811141457_76_20.jpg'] },
      { name: '桌面垃圾桶', description: '面向日常桌面的 3D 打印结构，支持多种垃圾袋规格，承重不超过 5kg。', stack: ['Fusion 360', 'Creality Print'], folder: '桌面垃圾桶', files: ['微信图片_20260811142254_79_20.jpg'] },
      { name: '谷子支架', description: '面向标准盒装谷子的展示与收纳支架。', stack: ['Fusion 360', 'Creality Print'], folder: '谷子支架', files: ['微信图片_20260811142253_78_20.jpg'] },
    ],
  },
  fpv: {
    name: '穿越机',
    kicker: 'FPV / field work',
    description: '从焊接工艺到飞行器组装、固件与飞控调试，建立可维护的飞行系统。',
    projects: [
      { name: '焊接展示', description: '展示穿越机电子系统装配中的焊接与线路连接能力。', stack: ['焊接', '电子装配', '线路调试'], folder: '焊接展示', files: ['微信图片_20260811142930_83_20.jpg', '微信图片_20260811142931_84_20.jpg', '微信图片_20260811142934_86_20.jpg', '微信图片_20260811142935_87_20.jpg', '微信图片_20260811142937_88_20.jpg', '微信图片_20260811142938_89_20.jpg', '微信图片_20260811142940_90_20.jpg', '微信图片_20260811142942_91_20.jpg'] },
      { name: '3 寸穿越机组装', description: '围绕小尺寸 FPV 平台完成结构、电子、固件与 PID 控制调试。', stack: ['Fusion 360', 'Creality Print', 'Betaflight', 'BLHeli32', 'Bluejay', '焊接', 'PID Control', 'Gyro'], folder: '穿越机组装_3inch', files: ['微信图片_20260811141450_71_20.jpg', '微信图片_20260811141451_73_20.jpg', '微信图片_20260811164204_100_20.jpg', '微信图片_20260811164206_101_20.jpg', '微信图片_20260811164207_102_20.jpg'] },
      { name: '5 寸穿越机组装', description: '面向标准 5 寸 FPV 平台的完整组装与飞控系统调试。', stack: ['Fusion 360', 'Creality Print', 'Betaflight', 'BLHeli32', 'Bluejay', '焊接', 'PID Control', 'Gyro'], folder: '穿越机组装_5inch', files: ['微信图片_20260811141438_65_20.jpg', '微信图片_20260811141440_67_20.jpg', '微信图片_20260811141441_68_20.jpg', '微信图片_20260811141442_69_20.jpg', '微信图片_20260811141444_70_20.jpg'] },
    ],
  },
}

export const withImages = (categoryKey) => categories[categoryKey].projects.map((project) => ({
  ...project,
  images: project.files.map((file) => asset(categoryKey === 'cs' ? 'CS' : categoryKey === 'design' ? '设计' : '穿越机', project.folder, file)),
}))
