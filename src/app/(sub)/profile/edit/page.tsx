'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import SubHeader from '@/components/shared/SubHeader';
import GradientButton from '@/components/shared/GradientButton';
import { useAuth } from '@/contexts/AuthContext';

function Field({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  const cls = 'w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400';
  return (
    <label className="block rounded-xl border border-gray-300 px-4 py-2 focus-within:border-purple-500">
      <span className="block text-xs text-gray-500">{label}</span>
      {multiline ? (
        <textarea rows={2} maxLength={150} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none`} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

function Row({ label, value, onClick }: { label: string; value?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between border-b border-gray-100 px-5 py-4 text-left">
      <span className="text-gray-900">{label}</span>
      <span className="flex items-center gap-1 text-sm text-gray-500">{value}<ChevronRight className="h-4 w-4" /></span>
    </button>
  );
}

export default function EditProfilePage() {
  const router = useRouter();
  const { profile, updateProfile } = useAuth();
  const [name, setName] = useState(profile?.full_name ?? '');
  const [username, setUsername] = useState(profile?.username ?? '');
  const [pronouns, setPronouns] = useState('');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [gender, setGender] = useState('Female');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!username.trim()) return toast.error('Username is required');
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    await updateProfile({ full_name: name, username: username.replace(/^@/, ''), bio });
    setSaving(false);
    router.push('/profile');
  };

  const soon = (what: string) => () => toast(`${what} coming soon`);

  return (
    <div className="pb-10">
      <SubHeader title="Edit profile" />

      <div className="flex flex-col items-center bg-white pb-6 pt-6">
        <div className="relative">
          <img
            src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${username}&background=7c3aed&color=fff&size=128`}
            alt="Profile"
            className="h-[104px] w-[104px] rounded-full border-4 border-white object-cover shadow"
          />
          <span className="absolute bottom-0 right-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1.5 text-white">
            <Camera className="h-4 w-4" />
          </span>
        </div>
        <button onClick={soon('Avatar upload')} className="mt-3 text-sm font-semibold text-[#5b32e8]">Edit picture or Avatar</button>
      </div>

      <div className="space-y-2 bg-white px-5 pb-6">
        <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
        <Field label="Username" value={username} onChange={setUsername} placeholder="@username" />
        <Field label="Pronouns" value={pronouns} onChange={setPronouns} placeholder="Add pronouns" />
        <Field label="Bio" value={bio} onChange={setBio} placeholder="Tell people about yourself" multiline />
        <button onClick={soon('Links')} className="pt-3 text-base font-medium text-gray-900">Add Link</button>
        <button onClick={soon('Banners')} className="block pt-3 text-base font-medium text-gray-900">Add banners</button>

        <div className="pt-4">
          <p className="mb-2 text-sm font-semibold text-gray-900">Profile information</p>
          <label className="relative block rounded-xl border border-gray-300 px-4 py-2">
            <span className="block text-xs text-gray-500">Gender</span>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full appearance-none bg-transparent pr-6 text-base outline-none">
              <option>Female</option><option>Male</option><option>Custom</option><option>Prefer not to say</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </label>
        </div>
      </div>

      <div className="mt-2 bg-white">
        <p className="px-5 pb-1 pt-4 font-semibold text-gray-900">Page</p>
        <Row label="Category" onClick={soon('Category')} value="Photographer" />
        <Row label="Contact Options" onClick={soon('Contact options')} />
        <Row label="Profile Hidden" onClick={soon('Profile visibility')} value="Off" />
        <Row label="Music" onClick={soon('Music')} />
        <div className="px-5 py-4">
          <p className="font-semibold text-gray-900">Personal Information setting</p>
          <p className="mt-1 text-sm text-gray-500">Show your profile is verified</p>
        </div>
      </div>

      <div className="px-5 pt-6">
        <GradientButton onClick={save} loading={saving}>Save changes</GradientButton>
      </div>
    </div>
  );
}
