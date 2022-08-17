import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Avatar from '../Avatar'

export default function Account({ session }: any) {
  const [loading, setLoading] = useState<boolean>(true)
  const [username, setUsername] = useState<any>(null)
  const [website, setWebsite] = useState<any>(null)
  const [avatar_url, setAvatarUrl] = useState<any>(null)
  
  const user: any = supabase.auth.user()
  useEffect(() => {
    window.localStorage.setItem('ninfo', user.id);
    getProfile()
  }, [user.id])

  
  async function getProfile() {
    try {
      setLoading(true)
      const user: any = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }


      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, email, avatar_url }: any) {
    try {
      setLoading(true)
      const user: any = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        email: session.user.email,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-sm-12 col-md-8 col-lg-6 form-widget">
         <Avatar
      url={avatar_url}
      size={150}
      onUpload={(url :any) => {
        setAvatarUrl(url)
        updateProfile({ username, website, avatar_url: url })
      }}
    />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      
    </div>
    </div>
  )
}