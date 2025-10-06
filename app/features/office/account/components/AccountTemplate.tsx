import { AccountForm } from "@/features/office/account/components/forms/AccountForm";
import { ChangePasswordForm } from "@/features/office/account/components/forms/ChangePasswordForm";

import { AccountCircleIcon } from "@/components/icons";
import { SearchForm } from "@/components/ui/forms/inputs/search/SearchForm";
import { UserInfo } from "@/components/ui/user/UserInfo";

import styles from "@/styles/pages/office/account/Account.module.css";

export const AccountTemplate = () => (
  <div className="officePage">
    <div className="flex items-center justify-between gap-x-[160px]">
      <h2 className="officePageTitle">Учетная запись</h2>
      <div className="w-full max-w-[566px]">
        <SearchForm />
      </div>
    </div>
    <div className="officePageContent">
      <div className={styles.avatarContainer}>
        <AccountCircleIcon
          sx={{
            width: "80px",
            height: "80px",
            color: "#1b2f52"
          }}
        />
        <div className={styles.userInfoWrapper}>
          <UserInfo />
        </div>
      </div>
      <AccountForm />
      <ChangePasswordForm />
    </div>
  </div>
);
