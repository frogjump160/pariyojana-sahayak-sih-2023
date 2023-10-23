number_of_projects = 200


f = open("project_data2.json", "w")

f.write("[\n")

for i in range(number_of_projects):
    f.write("{\n")
    f.write(f'\t"title\": "Project{i+1}",\n')
    f.write(f'\t"description": "Project{i+1}It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",\n')
    f.write(f'\t"imgUrl" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMI_US3vbqUALe9JWJvsQVYirYPEkabc0HDd1fXAHgszrOnUMO4Gxol5sLiEn7-Iocjqk&usqp=CAU"\n')
    if (i+1) != number_of_projects:
        f.write("},\n")
    else:
        f.write("}\n")


f.write("]\n")

f.close()
