const axios = require('axios')
const key = {
   gpt: '',
}

const modelConfig = {
   method: 'get',
   maxBodyLength: Infinity,
   url: 'https://api.baizhi.ai/v1/models',
   headers: {
      Authorization: 'Bearer ' + key.gpt,
   }
}

export async function getBaiReply (message: string) {
   const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.baizhi.ai/v1/chat/completions',
      headers: {
         Authorization: 'Bearer ' + key.gpt,
         'Content-Type': 'application/json',
      },
      data: {
         // model: 'theb-ai-4',
         model: 'gpt-4o-mini',
         // model: 'gpt-3.5-turbo',
         messages: [{ role: 'user', content: message, },],
         stream: false,
      }
   }

   try {
      const res: { data: { choices: Array<{ message: { content: string, role: string } }> } } = await axios.request(config)
      console.log('GPT: ', res.data)
      console.log('GPT: ', res.data.choices[0].message.content)
      setTimeout(() => {}, 100000)
      return res.data.choices[0].message.content
   } catch (e) {
      console.log('fetchGPTReplyError', e)
      return ''
   }
}

export async function getModels () {
   try {
      const res= await axios.request(modelConfig)
      console.log(res.data)
      setTimeout(() => {}, 100000)
      return res.data
   } catch (e) {
      console.log('fetchGPTReplyError', e)
      return ''
   }
}


getBaiReply('how r u')
// getModels()
