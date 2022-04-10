import os

with open('./devicon.yml', mode="r", encoding="utf-8") as f:
    print(os.getcwd())
    lines = f.readlines()
    for line in lines:
        techno = line.split(': ')[0]
        img = line.split(': ')[1]
        print(techno)
        technoPath = os.path.join(os.getcwd(),'parsed', techno+'.md')
        # technoPath = os.path.join(os.getcwd(),'parsed',techno)
        # os.makedirs(technoPath)
        # with open(technoPath+'/_index.md', mode="w", encoding="utf-8") as nf:
        with open(technoPath, mode="w", encoding="utf-8") as nf:
            nf.writelines([
                '---\n',
                'visibleInCms: true\n',
                'techno: '+techno+'\n',
                'img: '+img+'\n'
                '---\n'
            ])

            