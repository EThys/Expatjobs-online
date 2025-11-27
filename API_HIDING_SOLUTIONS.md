# Architecture recommandée pour masquer les API

## Option 1: Reverse Proxy (Simplest)
server {
    listen 80;
    server_name yourdomain.com;
    
    # API proxy - requêtes complètement invisibles
    location /api/ {
        proxy_pass https://expat-jobs-api-928b.onrender.com/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # Cacher les headers sensibles
        proxy_hide_header X-Powered-By;
        proxy_hide_header Server;
        
        # CORS
        add_header Access-Control-Allow-Origin $http_origin;
        add_header Access-Control-Allow-Credentials true;
    }
    
    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }
}

## Option 2: API Gateway (Scalable)
- Utiliser Cloudflare Workers
- AWS API Gateway  
- Netlify Functions
- Vercel Edge Functions
