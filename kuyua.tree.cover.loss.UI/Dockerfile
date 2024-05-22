FROM nginx AS base
EXPOSE 8050
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["/kuyua.tree.cover.loss.UI.csproj", "kuyua.tree.cover.loss.UI/"]
RUN dotnet restore "kuyua.tree.cover.loss.UI/kuyua.tree.cover.loss.UI.csproj"

COPY . .
WORKDIR "/src/kuyua.tree.cover.loss.UI"
copy . .
RUN dotnet build "kuyua.tree.cover.loss.UI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "kuyua.tree.cover.loss.UI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM  base AS final
WORKDIR /usr/share/nginx/html
COPY --from=publish /app/publish/wwwroot .
COPY  /nginx.conf /etc/nginx/nginx.conf