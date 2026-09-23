FROM rust:1-slim AS builder
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=builder /app/target/release/marketia-landing-page /usr/local/bin/marketia-landing-page
COPY public ./public
ENV PORT=3000
EXPOSE 3000
CMD ["marketia-landing-page"]
