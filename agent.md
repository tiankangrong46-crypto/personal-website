# 项目说明

## 技术栈

- 后端：Python 3.14、Django 6.1
- 后台管理：Django Admin、django-simpleui，默认语言为简体中文（`zh-hans`）
- 数据库：SQLite（开发环境，文件为 `db.sqlite3`）
- 前端：Vue 3、Vite 5、JavaScript
- 运行环境：Node.js 22、npm

## 目录结构

- `config/`：Django 项目配置与根路由。
- `core/`：后端核心应用，放置模型、视图、路由和后台注册。
- `frontend/`：独立的 Vue 单页前端项目。
- `.venv/`：Python 虚拟环境。
- `manage.py`：Django 管理命令入口。

## 本地运行

### 后端与后台

在项目根目录执行：

```powershell
.\.venv\Scripts\python.exe manage.py runserver
```

- Django 服务地址：`http://127.0.0.1:8000/`
- 管理后台地址：`http://127.0.0.1:8000/admin/`

如果 PowerShell 允许激活虚拟环境，也可以先执行：

```powershell
Set-ExecutionPolicy -Scope Process Bypass -Force
.\.venv\Scripts\Activate.ps1
```

### Vue 前端

在 `frontend/` 目录执行：

```powershell
npm.cmd run dev
```

前端开发服务器默认地址为 `http://127.0.0.1:5173/`。

## 开发约定

- 新增后端业务优先放入 `core`；只有独立且边界清晰的领域才新建 Django 应用。
- 新应用必须加入 `config/settings.py` 的 `INSTALLED_APPS`。
- `simpleui` 必须位于 `django.contrib.admin` 之前。
- 修改模型后依次执行 `makemigrations` 与 `migrate`，并保留迁移文件。
- Vue 页面与组件放在 `frontend/src/`，不要手动修改 `frontend/dist/` 或 `frontend/node_modules/`。
- 前端访问后端 API 时使用 Vite 的 `VITE_` 环境变量配置地址，不要硬编码开发地址。
- 不要将密码、密钥或生产环境配置写入代码或文档。

## 验证命令

```powershell
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe manage.py test
```

在 `frontend/` 目录执行：

```powershell
npm.cmd run build
```
