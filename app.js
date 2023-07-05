const express = require('express')
const axios = require('axios')
const cors = require('cors')
const jsSearchArray = require('js-search-array')

const app = express()
const port = process.env.PORT || 4000


app.use(cors())

app.get('/', (req, res) => {
    res.json({
        Get: '/surah',
        Get1: '/surah/:nosurat',
        Get2: '/surah/search/:namasurah',
        Get3: '/surat/:namasurat'
    })
})

app.get('/surah', async (req, res) => {
    try {
        const listSurat = await axios.get('https://api.npoint.io/99c279bb173a6e28359c/data')

        res.json({
            message: "success",
            data: listSurat.data
        })

    } catch (err) {
        res.status(500).json({
            message: "failed",
        })
    }
})

app.get('/surah/:nosurat', async (req, res) => {
    try {
        if (req.params.nosurat >= 115) {
            res.status(404).json({
                message: "limit",
                data: []
            })
            return false
        }

        const surat = await axios.get(`https://api.npoint.io/99c279bb173a6e28359c/surat/${req.params.nosurat}`)

        res.json({
            message: "success",
            data: surat.data
        })

    } catch (err) {
        res.status(500).json({
            message: "failed",
        })
    }

})

app.get('/surat/:namasurat', async (req, res) => {
    try {
        const listSurat = await axios.get('https://api.npoint.io/99c279bb173a6e28359c/data')

        const listSurat2 = JSON.parse(JSON.stringify(listSurat.data))

        const findSurah = listSurat2.find(surah => surah.nama == req.params.namasurat)

        if (!findSurah) return res.status(404).json({
            message: "not found"
        })

        res.json({
            message: "succes",
            data: findSurah
        })

    } catch (err) {
        res.status(500).json({
            message: "failed"
        })
    }


})

// search surah
app.get('/surah/search/:namasurah', async (req, res) => {
    try {
        const listSurat = await axios.get('https://api.npoint.io/99c279bb173a6e28359c/data')

        const listSurat2 = JSON.parse(JSON.stringify(listSurat.data))

        const findSurah = jsSearchArray(req.params.namasurah, listSurat2, 'nama')

        res.json({
            message: "succes",
            data: findSurah
        })

    } catch (err) {
        res.status(500).json({
            message: "succes"
        })
    }

})


app.get('*', (req, res) => {
    res.json({
        message: "not found"
    })
})

app.listen(port, () => console.log(`Server berjalan di http://localhost:${port}`))