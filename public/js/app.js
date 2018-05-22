import Nested from '../../src/Nested'

const data = [
    {
        type: 'folder',
        name: 'Ma musique',
        creation_date: '2018-05-04 14:53:26',
        last_modification_date: '2018-05-04 14:53:26',
        children: [
            {
                type: 'file',
                name: 'my song.mp3',
                extension: 'mp3',
                creation_date: '2018-05-04 14:55:12',
                last_modification_date: '2018-05-04 14:55:12',
            }, {
                type: 'file',
                name: 'my song_2.mp3',
                extension: 'mp3',
                creation_date: '2018-05-04 14:55:16',
                last_modification_date: '2018-05-04 14:55:16',
            }, {
                type: 'file',
                name: 'my song_3.mp3',
                extension: 'mp3',
                creation_date: '2018-05-04 14:55:24',
                last_modification_date: '2018-05-04 14:55:24',
            }, {
                type: 'file',
                name: 'my song_4.mp3',
                extension: 'mp3',
                creation_date: '2018-05-04 14:55:58',
                last_modification_date: '2018-05-04 14:55:58',
            }, {
                type: 'folder',
                name: 'favourites',
                creation_date: '2018-05-04 14:57:01',
                last_modification_date: '2018-05-04 14:57:01',
                children: [
                    {
                        type: 'file',
                        name: 'my favourite song.mp3',
                        extension: 'mp3',
                        creation_date: '2018-05-04 14:58:54',
                        last_modification_date: '2018-05-04 14:58:54',
                    }, {
                        type: 'file',
                        name: 'my favourite song_2.mp3',
                        extension: 'mp3',
                        creation_date: '2018-05-04 14:58:54',
                        last_modification_date: '2018-05-04 14:58:54',
                    }
                ]
            }
        ]
    }, {
        type: 'folder',
        name: 'Mes vidéos',
        creation_date: '2018-05-04 14:53:26',
        last_modification_date: '2018-05-04 14:53:26',
        children: [
            {
                type: 'file',
                name: 'my video.mp4',
                extension: 'mp4',
                creation_date: '2018-05-04 14:55:12',
                last_modification_date: '2018-05-04 14:55:12',
            }, {
                type: 'folder',
                name: 'favourites',
                creation_date: '2018-05-04 14:57:01',
                last_modification_date: '2018-05-04 14:57:01',
                children: [
                    {
                        type: 'file',
                        name: 'my favourite video.mp4',
                        extension: 'mp4',
                        creation_date: '2018-05-04 14:58:54',
                        last_modification_date: '2018-05-04 14:58:54',
                    }
                ]
            }
        ]
    }
]

const iconskeymap = {
    'video': /\.?(mp4|webm|ogg)/i,
    'pdf': /\.?(pdf)/i,
    'image': /\.?(jpe?g|png|tiff|svg|bmp)/i,
    'code': /\.?(jsx?|php|css|html|scss|less|rb|py|c|cs|sh)/i,
    'audio': /\.?(mp3|wav|ogg)/i,
    'archive': /\.?(zip|rar|7z|tar(\.gz)?)/i

}

const tree = new Nested(data)

let $breadcrumb = document.getElementById('breadcrumb')
let $tree = document.getElementById('tree')
let $mainframeList = document.getElementById('mainframe-list')
let $mainframeDetails = document.getElementById('mainframe-details')

let buildList = (data, root = false) => {
    let $list = document.createElement('ul')
    $list.classList.add('list')
    if (root) $list.classList.add('tree-root')
    data.forEach(item => {
        if (item.type === 'folder') {
            let $item = document.createElement('li')
            let $icon = document.createElement('span')
            let $title = document.createElement('a')
            $icon.classList.add('tree-icon')
            $title.textContent = item.name
            $item.id = item.getId()
            $item.classList.add('item')
            $item.classList.add('tree-folder')
            $icon.addEventListener('click', e => {
                const $el = e.target.parentNode
                if (!$el) return
                let node = tree.retrieveNode($item.id)
                if (!node) return
                if ($el.nextSibling) {
                    $el.classList.toggle('is-open')
                    $el.nextSibling.classList.toggle('is-visible')
                }
            })
            $title.addEventListener('click', e => {
                const $el = e.target.parentNode
                if (!$el) return
                let node = tree.retrieveNode($el.id)
                if (!node) return
                if (node.hasChildNodes()) {
                    Array.prototype.forEach.call($tree.querySelectorAll('.tree-folder.is-active'), element => element.classList.remove('is-active'))
                    $el.classList.add('is-active')
                    $mainframeList.innerHTML = ''
                    $breadcrumb.innerHTML = ''
                    node.breadcrumb().forEach(item => {
                        let span = document.createElement('span')
                        span.textContent = ` / ${item.name}`
                        $breadcrumb.appendChild(span)
                    })
                    node.childNodes().forEach(childnode => {
                        $mainframeDetails.innerHTML = ''
                        let el = document.createElement('a')
                        let icon = document.createElement('i')
                        let name = document.createElement('span')
                        icon.classList.add('mainframe-item-icon', 'far')
                        let iconName = 'fa-folder'
                        if (childnode.type === 'file') {
                            iconName = 'fa-file'
                            for (let i in iconskeymap) {
                                if (iconskeymap.hasOwnProperty(i) && iconskeymap[i].test(childnode.extension))
                                    iconName += `-${i}`
                            }
                        }
                        icon.classList.add(iconName)
                        el.appendChild(icon)
                        el.id = childnode.getId()
                        el.classList.add('mainframe-item')
                        name.textContent = childnode.name
                        el.appendChild(name)
                        el.addEventListener('click', e => {
                            if (childnode.type === 'file') {
                                let element = e.target.parentNode
                                let n = tree.retrieveNode(element.id)
                                $mainframeDetails.innerHTML = `
                                        <strong>Nom</strong> : ${n.name}<br>
                                        <strong>Type</strong> : ${n.extension}<br>
                                        <strong>Date de création</strong> : ${n.creation_date}<br>
                                        <strong>Date de dernière modification</strong> : ${n.last_modification_date}
                                    `
                            }
                        })
                        $mainframeList.appendChild(el)
                    })
                }
            })

            if (item.__parentid)
                $item.dataset.parentid = item.getParentId()

            $item.appendChild($icon)
            $item.appendChild($title)
            $list.appendChild($item)
        }
        if (item.hasChildNodes())
            $list.appendChild(buildList(item.childNodes()))
    })
    return $list
}

$tree.appendChild(buildList(tree.data, true))