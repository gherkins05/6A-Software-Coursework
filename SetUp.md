# How to set up this in vscode

## Extensions you will need
- [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [GitLens - Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## Downloading Git

It seems you can either download [git](https://git-scm.com/downloads) or you can go to the **Source Control** (Ctrl + Shift + G then G) and it should have instructions there on how to install it.

## Downloading the whole repository onto your device

> [!Important]
> There will be some files that aren't in the repo due to security
> I will email these out when I make and change them

In the terminal at the bottom, go to where you want the folder to be created but **DONT** create a folder here. It will do it for you. This can be achieved by using the **Open Folder** (Ctrl + K then Ctrl + O) and open it using that, or using terminal commands. <br />
Once the terminal route displays the correct location you need to enter:
```
git clone https://github.com/gherkins05/6A-Software-Coursework.git
```
If it has succeeded it will display
```
Recieving objects: 100% (X/X), done.
```
If it has failed, I may have forgotten something so feel free to [Email](https://mail.google.com/mail/u/up2203535@myport.ac.uk/#compose) or msg me on Whatsapp (+44 7913659521)<br />
When you edit something and want to upload it back to the repo, you will need to save it and go to **Source Control** and click on the **+** on each item you want to select with a particular message. Each **Commit** requires a message, this will be used to let everyone know whta you have done. Try to keep it short and consise.

> [!NOTE]
> You do multiple **Commits** at a time if needed

Once you have done a **Commit** you want to upload to the repo, just press the **Sync Changes** button and if you want to check, refresh the repo and the **Commit message** will appear next to the file(s) that you have updated or added.

## Updating your code to match the repo

If you want to update your local version of the repo to match the version on github you need to go to the folder that you created for this project in the terminal and enter:
```
git pull
```
If successful you will get something along the lines of:
```
1 file changed, 3 insertions(+), 1 deletion(-)
```

## Accidental Mistakes

If you accidentally push a change to the github repo that you didnt want to do, depending on access, you can either revertit yourself or let me know and I will revert it since I am the owner.