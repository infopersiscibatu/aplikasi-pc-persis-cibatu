<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The original PERSIS Cibatu app lives in `src/app/` and is rendered client-only from `src/routes/index.tsx` (it uses hash navigation); keeps the imported code intact while migrating.
- `legacy-server/` holds the original Express/Postgres server as reference only; it does not run here and its features are being rebuilt on Lovable Cloud.
