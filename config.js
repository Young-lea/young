/* =========================================================================
 *  魔法城堡 · 云端同步配置（Supabase）
 *  -----------------------------------------------------------------------
 *  本应用使用 Supabase Auth 做真实注册/登录（注册用户记录在 auth.users），
 *  云端数据按登录用户隔离（表 app_data 用 user_id 列 + RLS 策略）。
 *
 *  需要填两项（在 Supabase → Settings → API 复制）：
 *   - SUPABASE_URL      形如 https://xxxx.supabase.co
 *   - SUPABASE_ANON_KEY 项目的 anon/public key，值以  eyJ  开头（JWT）
 *                       注意：不是 "sb_publishable_..." 那个 key，
 *                       那个只能用于 Auth，不能访问数据表。
 *
 *  留空则自动降级为「纯本地存储」（顶栏显示「📴 仅本地」）。
 * ========================================================================= */
window.__APP_CONFIG__ = {
  SUPABASE_URL:      'https://lwqrekqsysmppxnbseux.supabase.co',
  SUPABASE_ANON_KEY:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cXJla3FzeXNtcHB4bmJzZXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NzcyOTMsImV4cCI6MjEwMzA1MzI5M30.0mlseNowuVHDlAVYkZLn4g5CbM0gJAHhXrF9YVzy2yU'
};
