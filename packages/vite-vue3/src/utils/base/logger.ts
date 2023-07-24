/**
 * 一个简单的控制台日志显示的hook小工具
 * 使用方法：  const { log } = useLogger(); log.success('日志工具', '好成功')
 * @returns 
 */
export const useLogger = () => {
    const typeColor = (type = 'default') => {
        let color = ''
        switch (type) {
            case 'primary':
                color = '#2d8cf0'
                break
            case 'success':
                color = '#19be6b'
                break
            case 'info':
                color = '#909399'
                break
            case 'warning':
                color = '#ff9900'
                break
            case 'danger':
                color = '#f03f14'
                break
            case 'default':
                color = '#35495E'
                break
            default:
                color = type
                break
        }
        return color
    }

    const print = (title: string, content?: any, type = 'primary') => {
        if (typeof content === 'object') { // 如果是对象则调用打印对象方式
            console.log(
                `%c ${title} `,
                `background:${typeColor(type)}; padding: 2px; border-radius: 4px;color: #fff;`,
                content
            )
            return
        } else {
            console.log(
                `%c ${title} %c ${content} %c`,
                `background:${typeColor(type)};border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`,
                `border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 0 4px 4px 0; color: ${typeColor(type)};`,
                'background:transparent'
            )
        }
    }

    const log = {
        primary: (title: string, content?: any) => {
            print(title, content)
        },
        success: (title: string, content?: any) => {
            print(title, content, 'success')
        },
        info: (title: string, content?: any) => {
            print(title, content, 'info')
        },
        warning: (title: string, content?: any) => {
            print(title, content, 'warning')
        },
        danger: (title: string, content?: any) => {
            print(title, content, 'danger')
        },

    }
    return { print, log }
}